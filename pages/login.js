import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import appglobal from "../services/api.service";
import style from "../styles/login.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

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
        localStorage.setItem("token", response.data.data.token);
      }
      // Login to Dashboard with Clinician Role
      else if (response.data.data.user.roles[0] == "clinician") {
        console.log("Clinician Account");
        localStorage.setItem("token", response.data.data.token);
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

                  <div className={style.inputcontainer}>
                    <FontAwesomeIcon
                      icon={faLock}
                      size="lg"
                      className={style.icon}
                    />
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
                    Login
                  </button>

                  <div className={style.text}>Forgot Password?</div>

                  <div className={style.text}>Sign Up</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default login;
