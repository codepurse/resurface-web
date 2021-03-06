import React, { Component, useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appglobal from "../services/api.service";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/login.module.scss";

function forgotPassword() {
  const router = useRouter();

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
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object({
        email: yup
          .string()

          .email()
          .required("Email Required"),
      })}
      onSubmit={(values) => {
        handleForgotPassword(values);
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

                <button type="submit" className={style.button}>
                  Submit
                </button>

                <Link href="/login">
                  <div className={style.text}>Already have an account? Login</div>
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default forgotPassword;
