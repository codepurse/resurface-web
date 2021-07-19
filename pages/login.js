import React, { Component, useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Header from "../components/header";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appglobal from "../services/api.service";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/login.module.scss";

function login() {
  const router = useRouter();

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
          router.push('/')
        }
        // Login to Dashboard with Clinician Role
        else if (response.data.data.user.roles[0] == "clinician") {
          console.log("Clinician Account");
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("id", response.data.data.user.id);
          localStorage.setItem(
            "clinician_id",
            response.data.data.user.clinician_id
          );
          localStorage.setItem(
            "Name",
            response.data.data.user.full_name
          );
          router.push('/')
        } else {
          console.log("No Role");
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response.response);
        alert(response.response.data.message)
      });
  };

  return (
  <>
    <Header></Header>
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: "",
        password: "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object({
        email: yup
          .string()

          .email()
          .required("Email Required"),
        password: yup
          .string()
          .required("Password Required")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
      })}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      <div className={style.bg}>
        <div className={style.row}>
          <div className={style.column}>
            <div className={style.container}>
              <img src="Image/Logo-white.png" className={style.photo} />
            </div>
          </div>

          <div className={style.column}>
            <div className={style.container}>
              <Form className={style.form}>
                <div className={style.inputcontainer}>
                  <Field
                    name="email"
                    type="text"
                    className="txtInput"
                    placeholder="Please enter Email Address"
                    // defaultValue="aasjahskj"
                  ></Field>
                  <div className={style.text_danger}>
                    <ErrorMessage name="email"></ErrorMessage>
                  </div>
                </div>
                <Field
                  name="password"
                  type="password"
                  className="txtInput"
                  placeholder="Please enter Password"
                  // defaultValue="aasjahskj"
                ></Field>
                <div className={style.text_danger}>
                  <ErrorMessage name="password"></ErrorMessage>
                </div>

                <button type="submit" className={style.button}>
                  Login
                </button>
                <Link href="/forgotPassword">
                  <div className={style.text}>Forgot Password?</div>
                </Link>

                <Link href="/register">
                  <div className={style.text}>Sign Up</div>
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  </>
    
  );
}

export default login;
