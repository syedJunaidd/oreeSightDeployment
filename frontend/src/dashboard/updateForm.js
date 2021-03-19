import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import "./style.scss";
import validationSchemaFor1 from "./validationSchemaFor";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import queryString from 'query-string'
import DashboardLayout from '../shared/layout/DashaboardLayout';

const UpdateForm = (props) => {
    const {id} = queryString.parse(props.location.search);
    const [user, setUser] = useState({});
    useEffect(() => {

      (async () => {
        const res = await axios.get(`${process.env["REACT_APP_API_URL"]}api/v1/users/profile/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        });
          setUser(res.data);
      })();

    }, []);

    const history = useHistory();

    return (
        <DashboardLayout activeKey={2}>
            <div class="content-header mt-3 mb-2">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="ml-4 text-dark">Edit User</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right mr-3">
                                <li class="breadcrumb-item"><a
                                    href="https://psschedule.interactivesolutions.tech/dashboard">Dashboard</a></li>
                                <li class="breadcrumb-item"><a
                                    href="https://psschedule.interactivesolutions.tech/admin/user">Users</a></li>
                                <li class="breadcrumb-item active">Edit User</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <section class="content">
                    <div class="row" style={{margin: "0", padding: "0"}}>
                        <div class="col-12">
                            <div class="card p-4">

         <Formik
                    initialValues={ user || {}}
                    validationSchema={validationSchemaFor1}
                    enableReinitialize={true}
                    onSubmit={ async (values) => {
                     values._id=id
                     try{
                        let res = await axios.put(`${process.env["REACT_APP_API_URL"]}api/v1/users`, values,{
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('access_token')}`
                            }
                        });
                        alert("Successfully Updated")
                        history.push('/lists')
                      
                      }
                      catch(error){
                        console.log('response',error)
                        alert("An error occurred");
                       }
                    }}
                  
                >
                     {({handleSubmit, handleChange, setFieldValue, values, errors}) => {
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
                                                                       placeholder="First Name *"
                                                                       onChange={handleChange}
                                                                       value={values.firstName}/>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.firstName}</span>
                                                            </div>
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Last Name: </label>
                                                                <input type="text" name="lastName" class="form-control"
                                                                       placeholder="Last Name *" onChange={handleChange}
                                                                       value={values.lastName}/>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.lastName}</span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Email: </label>
                                                                <input disabled type="text" name="email"
                                                                       class="form-control" placeholder="Your Email *"
                                                                       onChange={handleChange} value={values.email}/>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.email}</span>
                                                            </div>
                                                            <div class="col-sm-6 mb-3">
                                                                <label class="form-control-label">Phone: </label>
                                                                <div class="input-group ">
                                                                    <input type="text" name="phone" class="form-control"
                                                                           placeholder="Your Phone *"
                                                                           onChange={handleChange}
                                                                           value={values.phone}/>

                                                                </div>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.phone}</span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Company: </label>
                                                                <input type="text" name="company" class="form-control"
                                                                       placeholder="Company *" onChange={handleChange}
                                                                       value={values.company}/>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.company}</span>
                                                            </div>
                                                            <div class="col-sm-6 mb-3">
                                                                <label class="form-control-label">Job Title: </label>
                                                                <div class="input-group ">
                                                                    <input type="text" name="job" class="form-control"
                                                                           placeholder="Job Title *"
                                                                           onChange={handleChange} value={values.job}/>

                                                                </div>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.job}</span>

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Number of
                                                                    Employees: </label>
                                                                <select class="form-control" name="number_of_employees"
                                                                        onChange={handleChange}
                                                                        value={values.number_of_employees}>
                                                                    <option value="" disabled="" selected=""
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.0">
                                                                        Number of Employees
                                                                    </option>
                                                                    <option value="1-5"
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.1:$1-5">
                                                                        1-5
                                                                    </option>
                                                                    <option value="5-25"
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.1:$5-25">
                                                                        5-25
                                                                    </option>
                                                                    <option value="25-50"
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.1:$25-50">
                                                                        25-50
                                                                    </option>
                                                                    <option value="50-100"
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.1:$50-100">
                                                                        50-100
                                                                    </option>
                                                                    <option value="100-500"
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.1:$100-500">
                                                                        100-500
                                                                    </option>
                                                                    <option value="500-1000"
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.1:$500-1000">
                                                                        500-1000
                                                                    </option>
                                                                    <option value="1000+"
                                                                            data-reactid=".hbspt-forms-0.1:$3.1:$numemployees.$numemployees.0.1:$1000+">
                                                                        1000+
                                                                    </option>
                                                                </select>


                                                            </div>
                                                            <div class="col-sm-6">
                                                                <label class="form-control-label">Gender: </label>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group mb-3">
                                                                        <div class="maxl" onChange={handleChange}>
                                                                            <label class="radio inline">
                                                                                <input type="radio" name="gender"
                                                                                       value={true}
                                                                                       checked={values.gender?.toString() == "true"}
                                                                                       onChange={() => setFieldValue("gender", true)}/>
                                                                                <span> Male </span>
                                                                            </label>

                                                                            <label class="radio inline"
                                                                                   style={{marginLeft: "10px"}}>
                                                                                <input type="radio" name="gender"
                                                                                       value={false}
                                                                                       checked={values.gender?.toString() == "false"}
                                                                                       onChange={() => setFieldValue("gender", false)}/>
                                                                                <span
                                                                                    style={{marginLeft: "5px"}}>Female </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row" data-select2-id="7">
                                                            <div class="col-sm-12 col-md-12" data-select2-id="6">
                                                                <label class="form-control-label">User Role: </label>
                                                                <select name="role" onChange={handleChange}
                                                                        value={values.role} id="role"
                                                                        class="form-control select2-hidden-accessible">
                                                                    <option value="" data-select2-id="4">Select Role
                                                                    </option>
                                                                    <option value="admin" data-select2-id="10">
                                                                        Admin
                                                                    </option>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div class={`form-group row ${id ? "d-none" : ""}`}>
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Password: </label>
                                                                <input type="password" name="password"
                                                                       class="form-control" placeholder="Password *"
                                                                       onChange={handleChange} value={values.password}/>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.password}</span>
                                                            </div>
                                                            <div class="col-sm-12 col-md-6">
                                                                <label class="form-control-label">Re-Type
                                                                    Password: </label>
                                                                <input type="password" class="form-control"
                                                                       placeholder="Confirm Password *" value=""
                                                                       name="password_confirmation"
                                                                       onChange={handleChange}
                                                                       value={values.password_confirmation}/>
                                                                <span
                                                                    className={`error_notifier text-danger`}>{errors.password_confirmation}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-lg-12">
                                                                <input type="submit" name="submit"
                                                                       className="btn btn-primary"
                                                                       value="Update User"/>
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
export default UpdateForm;