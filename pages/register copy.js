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
  formData.append("name", values.userName);
  formData.append("first_name", values.firstName);
  formData.append("middle_name", values.middleName);
  formData.append("last_name", values.lastName);
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
      // console.log(response.response.data.error.email[0]);
      // alert(response.response.data.error.email[0])
    });


};



const register = () => (
  <Formik
    initialValues={{ email: "", userName: "",firstName:"",middleName:"",lastName:"", password: "" }}
    onSubmit={(values) => {
      handleRegister(values);
    }}
    // Validation in form field
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Email Required"),
      userName: Yup.string().required("Username Required"),
      firstName: Yup.string().required("First Name Required"),
      middleName: Yup.string().required("Middle Name Required"),
      lastName: Yup.string().required("Last Name Required"),
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
              name="userName"
              type="text"
              placeholder="Enter Username"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
            // className={styles.input}
            />
            {errors.userName && touched.userName && (
              <div className={style.error_msg}>{errors.userName}</div>
            )}
            <label htmlFor="email">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.firstName && touched.firstName && (
              <div className={style.error_msg}>{errors.firstName}</div>
            )}
            <label htmlFor="email">Middle Name</label>
            <input
              name="middleName"
              type="text"
              placeholder="Enter Middle Name"
              value={values.middleName}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.middleName && touched.middleName && (
              <div className={style.error_msg}>{errors.middleName}</div>
            )}
            <label htmlFor="email">last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Enter last Name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              // className={styles.input}
            />
            {errors.lastName && touched.lastName && (
              <div className={style.error_msg}>{errors.lastName}</div>
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
