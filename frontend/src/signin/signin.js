import React, { useState } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactDOM from "react-dom";
import validationSchema from "./validationSchema";
import "./style.scss";
import { Formik } from "formik";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Signin = () => {
    const [loggedInState, setLoggedInState] = useState(false);
    const [disabledbtnClass, setDisabledbtnClass] = useState('');
    const history = useHistory();
    const handleFileClick = () => {
        history.push('/forgetpass');
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center login_wrapper">
                    <div className="auth-nav">
                        <a href="/">
                            <h3 style={{ fontSize: "14px" }}><b>OreeSight</b></h3>
                        </a>
                    </div>
                    <div className="auth-outer" >
                        <div className="mobile-auth-toggle">
                            <h3 className="title">Have an account?</h3>
                            <button type="button" className="button action-btn is-rounded">Register</button>
                        </div>
                        <div className="auth-box shadow">
                            <div className="form-wrapper">
                                <div className="login">
                                    <div className="header">
                                        <h2 className="title is-4">Login</h2>
                                    </div>
                                    <div className="body">
                                        <Formik
                                            initialValues={{}}
                                            validateOnChange={false}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                setLoggedInState(true);
                                                setDisabledbtnClass('noCursor')
                                                try {
                                                    let res = await axios.post(`${process.env.REACT_APP_API_URL}api/v1/authenticate`, values);
                                                    let data = JSON.stringify(res.data)
                                                    localStorage.setItem('user', data);
                                                    localStorage.setItem('access_token', res.data.access_token);
                                                    history.push('/dashboard')
                                                } catch (error) {
                                                    console.log('response', error)
                                                    alert('User name or password is incorrect')
                                                    setLoggedInState(false)
                                                    setDisabledbtnClass('')
                                                }
                                            }}
                                        >
                                            {({ handleSubmit, handleChange, values, errors }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <input type="hidden" name="_token"
                                                        value="hXcEpdURQMsUtWpyi9p0kma0zDZ0QJJeN170G4Ep" />
                                                    <div className="field">
                                                        <div className="control">
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="control">
                                                            <input type="text" className="input" placeholder="Email"
                                                                name="email" onChange={handleChange}
                                                                value={values.email} />
                                                            <div className="form-icon">
                                                                <i className="sl sl-icon-envelope-open"></i>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className={`error_notifier text-danger`}>{errors.email}</span>
                                                    </div>
                                                    <div className="field">
                                                        <div className="control">
                                                            <input type="password" className="input"
                                                                placeholder="Password" name="password"
                                                                onChange={handleChange} value={values.password} />
                                                            <div className="form-icon">
                                                                <i className="sl sl-icon-lock"></i>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className={`error_notifier text-danger`}>{errors.password}</span>
                                                    </div>
                                                    <button type="submit" className={`button primary-btn raised is-rounded is-bold ${disabledbtnClass}`} disabled={loggedInState}>
                                                        {loggedInState && (
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />
                                                        )}
                                                        {loggedInState && <span>Loggin In</span>}
                                                        {!loggedInState && <span>Login</span>}
                                                    </button>
                                                    <a href="#" className="forgot-password"
                                                        onClick={() => handleFileClick()}>
                                                        Forgot Password?
                                                   </a>
                                                </form>
                                            )
                                            }
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                            <div className="side-box">
                                <h3 className="title is-light" style={{ fontSize: "22px" }}>Have an account?</h3>
                                <a href="/register" className="button action-btn is-rounded"
                                    style={{ minWidth: "160px", height: "35px" }}>Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signin;