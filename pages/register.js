import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import style from "../styles/login.module.scss";
import appglobal from "../services/api.service";

// Register Function
const handleRegister = (values) => {
  // Send Data Via Form-data Format
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("name", values.username);
  formData.append("password", values.password);

  axios({
    method: "post",
    url: appglobal.api.base_api + appglobal.api.register,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data.status);
      alert(response.data.status)

   
    })
    .catch(function (response) {
      //handle error
      console.log(response.response.data.error.email[0]);
      alert(response.response.data.error.email[0])
    });

};



const register = () => (
  <Formik
    initialValues={{ email: "",username:"", password: "" }}
    onSubmit={(values) => {
      handleRegister(values);
    }}
    // Validation in form field
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Email Required"),
      username: Yup.string().required("Username Required"),
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
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.email && touched.email && (
              <div className={style.error_msg}>{errors.email}</div>
            )}
             <label htmlFor="email">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.username && touched.username && (
              <div className={style.error_msg}>{errors.username}</div>
            )}
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.password && touched.password && (
              <div className={style.error_msg}>{errors.password}</div>
            )}
            <button type="submit" className={style.button}>
              Register
            </button>
          </form>
        </div>
      );
    }}
  </Formik>
);

export default register;
