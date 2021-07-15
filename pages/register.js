import React, { Component, useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appglobal from "../services/api.service";
import Link from "next/link";
import { useRouter } from 'next/router'
import style from "../styles/login.module.scss";

function register() {
  const router = useRouter();

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
        router.push('/login')
      })
      .catch(function (response) {
        //handle error
        console.log(response.response.data.error.email[0]);
        alert(response.response.data.error.email[0])
      });
  };




  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: "",
        userName: "",
        firstName: "",
        middleName: "",
        lastName: "",
        password: "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object({
        email: yup
          .string()

          .email().required("Email Required"),

        userName: yup
          .string()

          .required("Username Required"),
        firstName: yup
          .string()

          .required("First Name Required"),
        middleName: yup
          .string()

          .required("Middle Name Required"),
        lastName: yup
          .string()

          .required("Last Name Required"),
        password: yup
          .string()
          .required("Password Required")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
      })}
      onSubmit={(values) => {
        handleRegister(values)
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
                  name="userName"
                  type="text"
                  className="txtInput"
                  placeholder="Please enter Username"
                // defaultValue="aasjahskj"
                ></Field>
                 <div className={style.text_danger}>
                  <ErrorMessage name="userName"></ErrorMessage>
                </div>
                <Field
                  name="firstName"
                  type="text"
                  className="txtInput"
                  placeholder="Please enter Firstname"
                // defaultValue="aasjahskj"
                ></Field>
                 <div className={style.text_danger}>
                  <ErrorMessage name="firstName"></ErrorMessage>
                </div>
                <Field
                  name="middleName"
                  type="text"
                  className="txtInput"
                  placeholder="Please enter Middlename"
                // defaultValue="aasjahskj"
                ></Field>
                <div className="text-danger">
                  <ErrorMessage name="middleName"></ErrorMessage>
                </div>
                <Field
                  name="lastName"
                  type="text"
                  className="txtInput"
                  placeholder="Please enter Lastname"
                // defaultValue="aasjahskj"
                ></Field>
                <div className={style.text_danger}>
                  <ErrorMessage name="lastName"></ErrorMessage>
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
                  Register
                </button>
                <Link href="/login">
                  <div className={style.text}>Already have an account?</div>
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </div>

    </Formik>
  );
}

export default register;
