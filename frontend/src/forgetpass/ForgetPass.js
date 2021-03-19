import React, { useState } from 'react'
import ReactDOM from "react-dom";
import validationSchema from "./validationSchema";
import { Formik } from "formik";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./style.scss";

const ForgetPass = () => {
  const history = useHistory();
  return (
    <>
      <div className="container d-flex  vh-100 ">
        <div className="row  w-100 justify-content-center align-self-center   ">
          <div className=" col-md-5 card shadow ">
            <div className="row">
              <div className="col-12 text-center mt-2 mb-2">
                <span className="log">Forget Password</span>
              </div>
            </div>
            <Formik
              initialValues={{}}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  let res = await axios.post(`${process.env["REACT_APP_API_URL"]}api/v1/users/forgotPassword`, values);
                  if (res.status == 200) {
                    alert("A password reset code is sent on your email address");
                    localStorage.setItem("ms_project_user_email", values.email);
                    history.push('/changepassword')
                  } else if (res.status == 202) {
                    alert("This email is not registered");
                  } else {
                    alert("An error occurred on the server, try again later");
                  }
                }
                catch (error) {
                  console.log('response', error)
                }
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="Email" name="email" onChange={handleChange} value={values.email} />
                        <span className={`error_notifier text-danger`}>{errors.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <div className="col-12 text-center">
                      <div>
                        <button type="submit" class="btn btn-warning text-white">Submit</button>
                      </div>
                    </div>
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
export default ForgetPass;