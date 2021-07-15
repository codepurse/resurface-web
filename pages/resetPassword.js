import React, { Component, useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appglobal from "../services/api.service";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/login.module.scss";

function resetPassword() {
  const router = useRouter();

  // Reset Password Function
  const handleResetPassword = (values) => {
    // Send Data Via Form-data Format
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    axios({
      method: "post",
      url: appglobal.api.base_api + reset_password,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response.data.data)
      })
      .catch(function (response) {
        //handle error
        console.log(response.response)
      });
  };

  return (
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
        handleResetPassword(values);
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
                  Reset Password
                </button>
             
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default resetPassword;
