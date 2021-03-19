import React, {useState} from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactDOM from "react-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import "./style.scss";
import validationSchema from "./validationSchema";
import axios from 'axios';
import {useHistory} from "react-router-dom";

const Register = () => {
    const [loggedInState, setLoggedInState] = useState(false);
    const [disabledbtnClass, setDisabledbtnClass] = useState('');
    const history = useHistory();
    return (
        <>        
            <div class="register-box" style={{width: "900px", margin: "2% auto"}}>
                <div class="register-logo">
                    <a href="https://psschedule.interactivesolutions.tech" style={{textDecoration: "none"}}><b>Field
                        Scheduling</b></a>
                </div>
                <div class="card">
                    <div class="card-body register-card-body">
                        <p class="login-box-msg">Register a new membership</p>

                        <Formik
                            initialValues={{}}
                            validateOnChange={false}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                setLoggedInState(true);
                                setDisabledbtnClass('noCursor')
                                try{
                                    let res = await axios.post(`${process.env["REACT_APP_API_URL"]}api/v1/users/register`, values);
                                    alert("You are successfully registered")
                                    history.push('/')
                                    console.log("res",res)
                                }
                                catch(error){
                                    console.log('response',error);
                                    setLoggedInState(false);
                                    setDisabledbtnClass('');
                                }
                            }}
                  
                        >
                        {({handleSubmit, handleChange, setFieldValue, values, errors}) => {
                        const handleCheckboxesChange = () => {
                                }
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="_token"
                                               value="nozRv8x6ZTChQFuIocaP7sv0Q33Lf8pgrrca5KH7"/>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="input-group ">
                                                    <input type="text" name="firstName" class="form-control"
                                                           placeholder="First Name" onChange={handleChange}
                                                           value={values.firstName}/>
                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-user"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`error_notifier text-danger`}>{errors.firstName}</span>
                                            </div>
                                            <div class="col-6 ">
                                                <div class="input-group">
                                                    <input type="text" name="lastName" class="form-control"
                                                           placeholder="Last Name *" onChange={handleChange}
                                                           value={values.lastName}/>

                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-user"></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <span className={`error_notifier text-danger`}>{errors.lastName}</span>
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group ">
                                                    <input type="email" name="email" class="form-control"
                                                           placeholder="Your Email *" onChange={handleChange}
                                                           value={values.email}/>

                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-envelope"></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <span className={`error_notifier text-danger`}>{errors.email}</span>
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group">
                                                    <input type="text" name="phone" class="form-control"
                                                           placeholder="Your Phone *" onChange={handleChange}
                                                           value={values.phone}/>

                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-phone"></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <span className={`error_notifier text-danger`}>{errors.phone}</span>
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group">
                                                    <input type="text" name="company" class="form-control"
                                                           placeholder="Company *" onChange={handleChange}
                                                           value={values.company}/>

                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-building"></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <span className={`error_notifier text-danger`}>{errors.company}</span>
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group">
                                                    <input type="text" name="job" class="form-control"
                                                           placeholder="Job Title *" onChange={handleChange}
                                                           value={values.job}/>

                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-award"></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <span className={`error_notifier text-danger`}>{errors.job}</span>
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group">
                                                    <input type="password" name="password" class="form-control"
                                                           placeholder="Password *" onChange={handleChange}
                                                           value={values.password}/>

                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-lock"></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <span className={`error_notifier text-danger`}>{errors.password}</span>
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group">
                                                    <input type="password" class="form-control"
                                                           placeholder="Confirm Password *" value=""
                                                           name="password_confirmation" onChange={handleChange}
                                                           value={values.password_confirmation}/>

                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-lock"></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <span
                                                    className={`error_notifier text-danger`}>{errors.password_confirmation}</span>
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group ">
                                                    <select class="form-control" name="number_of_employees">
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
                                            </div>
                                            <div class="col-6 mt-3">
                                                <div class="input-group">
                                                    <div class="maxl" onChange={handleChange}>
                                                        <label class="radio inline">
                                                            <input type="radio" name="gender" value="Male" value={true}
                                                                   checked={values.gender === "true"}
                                                                   onChange={() => setFieldValue("gender", true)}/>
                                                            <span> Male </span>
                                                        </label>

                                                        <label class="radio inline" style={{marginLeft: "10px"}}>
                                                            <input type="radio" name="gender" value={false}
                                                                   checked={values.gender === "false"}
                                                                   onChange={() => setFieldValue("gender", false)}/>
                                                            <span style={{marginLeft: "5px"}}>Female </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 mt-4 mb-3"> 
                                                {/* <button type="submit" class="btn btn-primary btn-block">
                                                    {loggedInState==="logging in" ?   <span>Register<Loader className="loaderReg" 
                                                    
                                                    type="Rings" 
                                                    color="#00BFFF" 
                                                    height={35} 
                                                    width={35}/>
                                               
                                                    </span> : "Register" }
                                                </button> */}
                                                <button type="submit" className={`btn btn-primary btn-block ${disabledbtnClass}`} disabled={loggedInState}>
                                                    {loggedInState && (
                                                        <i
                                                            className="fa fa-refresh fa-spin"
                                                            style={{ marginRight: "5px" }}
                                                        />
                                                    )}
                                                    {loggedInState && <span>Registring</span>}
                                                    {!loggedInState && <span>Register</span>}
                                                </button>
                                            </div>

                                        </div>
                                    </form>

                                )
                            }}
                        </Formik>
                        <div className="text-center mb-2">
                        {loggedInState==="logging in" ? "": 
                            <a href="/" class="text-center">I already have a membership</a>
                        }
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
export default Register;
