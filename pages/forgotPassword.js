import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from 'next/link'

import appglobal from "../services/api.service";
import style from "../styles/login.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

// Forgot Password Function
const handleForgotPassword = (values) => {
  // Send Data Via Form-data Format
  const formData = new FormData();
  formData.append("email", values.email);

  axios({
    method: "post",
    url: appglobal.api.base_api + appglobal.api.forgot_password,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data.data);
    })
    .catch(function (response) {
      //handle error
      console.log(response.response);
    });
};

const forgotPassword = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values) => {
      handleLogin(values);
    }}
    // Validation in form field
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Email Required"),
    })}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      return (
        <div className={style.bg}>
          <div className={style.row}>
            <div className={style.column}>
              <div className={style.container}>
                <img src="Image/Logo-white.png" className={style.photo} />
              </div>
            </div>

            <div className={style.column}>
              <div className={style.container}>
                <form onSubmit={handleSubmit} className={style.form}>
                  <div className={style.inputcontainer}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size="lg"
                      className={style.icon}
                    />
                    <input
                      name="email"
                      type="text"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={style.inputfield}
                    />
                    {errors.email && touched.email && (
                      <div className={style.error_msg}>{errors.email}</div>
                    )}
                  </div>

                  <button type="submit" className={style.button}>
                    Submit
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default forgotPassword;
