import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import appglobal from "../services/api.service";
import style from "../styles/login.module.scss";

// Login Function
const handleLogin = (values) => {
  // Send Data Via Form-data Format
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);

  axios({
    method: "post",
    url: appglobal.api.base_api + appglobal.api.login,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data.data);

      // Login to dashboard with admin role
      if (response.data.data.user.roles[0] == "admin") {
        console.log("Admin Account");
        localStorage.setItem('token', response.data.data.token);
      }
      // Login to Dashboard with Clinician Role
      else if (response.data.data.user.roles[0] == "clinician") {
        console.log("Clinician Account");
        localStorage.setItem('token', response.data.data.token);
      } else {
        console.log("No Role");
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response.response);
    });
};



const login = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values) => {
      handleLogin(values);
    }}
    // Validation in form field
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Email Required"),
      password: Yup.string()
        .required("Password Required")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
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
        <div className={style.container}>
          <form onSubmit={handleSubmit} className={style.form}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.email && touched.email && (
              <div className={style.error_msg}>{errors.email}</div>
            )}
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.password && touched.password && (
              <div className={style.error_msg}>{errors.password}</div>
            )}
            <button type="submit" className={style.button}>
              Login
            </button>
          </form>
        </div>
      );
    }}
  </Formik>
);

export default login;
