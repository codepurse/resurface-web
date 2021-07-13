import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from 'next/link'

import appglobal from "../services/api.service";
import style from "../styles/login.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

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
      alert(response.data.status);
    })
    .catch(function (response) {
      //handle error
      // console.log(response.response.data.error.email[0]);
      // alert(response.response.data.error.email[0])
    });
};

const register = () => (
  <Formik
    initialValues={{
      email: "",
      userName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      password: "",
    }}
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

                  <div className={style.inputcontainer}>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    // className={styles.input}
                    />
                    {errors.password && touched.password && (
                      <div className={style.error_msg}>{errors.password}</div>
                    )}
                  </div>

                  <button type="submit" className={style.button}>
                    Register
                  </button>
                  <Link href="/login">
                    <div className={style.text}>Already have an account?</div>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default register;
