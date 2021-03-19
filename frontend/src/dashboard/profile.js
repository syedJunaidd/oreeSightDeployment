import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import "./style.scss";
import validationSchemaFor1 from "./validationSchemaFor";
import axios from 'axios';
import DashboardLayout from '../shared/layout/DashaboardLayout';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
    let user1 = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    const id = user1._id;
    const [user, setUser] = useState({});
    const [loggedInState, setLoggedInState] = useState(false);
    const [disabledbtnClass, setDisabledbtnClass] = useState('');
    const [file, setFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    useEffect(() => {

        (async () => {
            const res = await axios.get(`${process.env["REACT_APP_API_URL"]}api/v1/users/profile`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            console.log(res.data);
            if(res.data.profileImage){
                if(res.data.profileImage == ""){
                    setImgUrl(`${process.env["REACT_APP_API_URL"]}static/profileImages/noThumbnail.jpg`)
                }else{
                    setImgUrl(`${process.env["REACT_APP_API_URL"]}static/profileImages/`+res.data.profileImage)
                }
            }else{
                setImgUrl(`${process.env["REACT_APP_API_URL"]}static/profileImages/noThumbnail.jpg`)
            }
            setUser(res.data);
        })();

    }, []);

    const setImgView = (selectedFile) => {
        setImgUrl(URL.createObjectURL(selectedFile))
        setFile(selectedFile);
    }
    return (
        <DashboardLayout activeKey={3}>
            <div class="container content-header mb-4 mt-3">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="ml-3 text-dark">Profile Info</h1>
                    </div>

                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right mr-4">
                            <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                            <li class="breadcrumb-item active">Profile Info</li>
                        </ol>
                    </div>

                </div>

            </div>


            <div className="container-fluid">

                <section class="content">
                    <div class="row" style={{ padding: "0", margin: "0" }}>
                        <div class="col-12">
                            <div class="card p-4">
                                <Formik
                                    initialValues={{
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        phone: user.phone,
                                        company: user.company,
                                        job: user.job,
                                        profileImage : user.profileImage
                                    }}
                                    validationSchema={validationSchemaFor1}
                                    enableReinitialize={true}
                                    onSubmit={async (val) => {
                                        setLoggedInState(true);
                                        setDisabledbtnClass('noCursor')
                                        val._id = id;
                                        let values = new FormData();
                                        values.append("firstName", val.firstName);
                                        values.append("lastName", val.lastName);
                                        values.append("email", val.email);
                                        values.append("phone", val.phone);
                                        values.append("company", val.company);
                                        values.append("job", val.job);
                                        values.append("profileImage", val.profileImage);
                                        values.append("_id", val._id);
                                        values.append("profilePicture", file, "profilePicture");
                                        try {
                                            let res = await axios.put(`${process.env["REACT_APP_API_URL"]}api/v1/users`, values, {
                                                headers: {
                                                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                                                }
                                            });
                                            alert("Profile Successfully Updated")
                                            history.push('/dashboard')
                                        }
                                        catch (error) {
                                            console.log('response', error);
                                            setLoggedInState(false);
                                            setDisabledbtnClass('')
                                        }
                                    }}
                                >
                                    {({ handleSubmit, handleChange, setFieldValue, values, errors }) => {
                                        const handleCheckboxesChange = () => {
                                        }
                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <div class="row">

                                                    <div class="col-lg-9">
                                                        <div class="form-group row">
                                                            <div class="col-sm-12">
                                                            </div>
                                                            <div class="col-sm-12">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">First Name: </label>
                                                                <input type="text" name="firstName" class="form-control"
                                                                    placeholder="First Name" onChange={handleChange}
                                                                    value={values.firstName} />
                                                            </div>
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Last Name: </label>
                                                                <input type="text" name="lastName" class="form-control"
                                                                    placeholder="Last Name *" onChange={handleChange}
                                                                    value={values.lastName} />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Email: </label>
                                                                <input type="text" name="email" class="form-control"
                                                                    placeholder="Your Email *"
                                                                    onChange={handleChange} value={values.email} />
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <label class="form-control-label">Phone: </label>
                                                                <div class="input-group mb-3">
                                                                    <input type="text" name="phone" class="form-control"
                                                                        placeholder="Your Phone *"
                                                                        onChange={handleChange}
                                                                        value={values.phone} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Company: </label>
                                                                <input type="text" name="company" class="form-control"
                                                                    placeholder="Company *" onChange={handleChange}
                                                                    value={values.company} />
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <label class="form-control-label">Job Title: </label>
                                                                <div class="input-group mb-3">
                                                                    <input name="job" class="form-control"
                                                                        placeholder="Job Title *"
                                                                        onChange={handleChange} value={values.job} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-lg-12">
                                                                {/* <input type="submit" name="submit"
                                                                    className="btn btn-primary"
                                                                    value="Update Profile" /> */}
                                                                <button type="submit" className={`btn btn-primary ${disabledbtnClass}`} disabled={loggedInState}>
                                                                    {loggedInState && (
                                                                        <i
                                                                            className="fa fa-refresh fa-spin"
                                                                            style={{ marginRight: "5px" }}
                                                                        />
                                                                    )}
                                                                    {loggedInState && <span>Updating Profile</span>}
                                                                    {!loggedInState && <span>Update Profile</span>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-12">
                                                        <div className="profileSection">
                                                            <div className="profileSectionHeader">
                                                                Profile Picture
                                                            </div>
                                                            <div className="profileSectionBody">
                                                                <div className="row trimm">
                                                                    <div className="col-md-9 col-lg-9 col-sm-9 trimm">
                                                                        <input type="text" name="fileName" class="form-control"
                                                                            placeholder="Choose File *" readOnly value={file?.name} />
                                                                    </div>
                                                                    <div className="col-md-3 col-lg-3 col-sm-3 trimm">
                                                                        <label for="upload-photo" className="lblSlct">Browse</label>
                                                                        <input type="file" name="photo" id="upload-photo" accept="image/jpeg,image/gif,image/png"
                                                                            onChange={(e) => {
                                                                                setImgView(e.target.files[0]);
                                                                            }}/>
                                                                    </div>
                                                                </div>
                                                                <div className="imgContainer">
                                                                    <img src={imgUrl} className="profilePic"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    )
}
export default Profile;
