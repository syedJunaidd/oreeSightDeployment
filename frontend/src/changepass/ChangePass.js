import React, {useState, useEffect} from 'react'
import ReactDOM from "react-dom";
import validationSchema from "./validationSchema";
import {Formik} from "formik";
import axios from 'axios';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

import "./style.scss";


const ChangePass = () => {

    // const [recovery,setRecovery]=useState({});
    // useEffect(() => {

    //    (async () => {
    //      const res = await axios.get(`${process.env["REACT_APP_API_URL"]}api/v1/users/reset?resetPasswordToken=5a5362b0edc64d165cce494410bfdcec3a93ffe5`, {
     
    //    });
    //    console.log("res" ,res)
    // //  setRecovery(res);

    //    })();

    //  }, []);


    const history = useHistory();

    return (
        <>

            <div className="container d-flex  vh-100 ">
                <div className="row  w-100 justify-content-center align-self-center   ">
                    <div className=" col-md-5 card shadow ">
                        <div className="row">
                            <div className="col-12 text-center mt-2 mb-2">
                                <span className="log">Change Password</span>
                            </div>
                        </div>

<Formik
                    initialValues={{}}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                       try{
                           const tokenResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/v1/users/reset?resetPasswordToken=${values.token}`);
                            if (tokenResponse.status == 202) {
                                alert("Password reset token is invalid or has expired");
                            } else if (tokenResponse.status == 200) {
                                let res = await axios.post(`${process.env.REACT_APP_API_URL}api/v1/users/resetPassword`, values);
                                if (res.status == 200) {
                                    history.push('/dashboard')
                                } else {
                                    alert("An error occurred");
                                }
                            } else {
                                alert("An error occurred");
                            }
                       }
                       catch(error){
                        console.log('response',error)
                           alert("An error occurred");
                       }
                    }}
                  
                >
                    {({handleSubmit, handleChange, values, errors}) => (


                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter code"
                                                       name="token"
                                                       onChange={handleChange} value={values.token}/>
                                                <span className={`error_notifier text-danger`}>{errors.token}</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">

                                                <input disabled={true} type="text" class="form-control" placeholder="Email" name="email"
                                                       onChange={handleChange} value={values.email}/>
                                                <span className={`error_notifier text-danger`}>{errors.email}</span>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="f">

                                                <input type="password" class="form-control" id="exampleInputPassword1"
                                                       placeholder="New Password" name="password"
                                                       onChange={handleChange} value={values.password}/>
                                                <span className={`error_notifier text-danger`}>{errors.password}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row mb-3 mt-2">
    <div className="col-12">
<div class="float-right">
<small id="emailHelp" class="form-text text-muted">Forget Password?</small>
  
  </div>
    </div>
    </div> */}
                                    <div className="row mb-3 mt-3 ">
                                        <div className="col-12 text-center">
                                            <div>
                                                <button type="submit"
                                                        class="btn btn-danger btn-block  text-white">Save
                                                </button>

                                            </div>
                                        </div>
                                        {/* <div className="col-6 pl-1">
    <div >
  <button type="button" class="btn btn-block btn-primary">Primary</button>
  </div>
</div> */}
                                    </div>


                                </form>
                            )
                            }
                        </Formik>
                    </div>


                </div>

            </div>


        </>

    )
}
export default ChangePass;
