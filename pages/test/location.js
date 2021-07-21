import React, { Component, useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Header from "../../components/header";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appglobal from "../../services/api.service";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../../styles/login.module.scss";

function login() {
  const router = useRouter();

//     get location
useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: appglobal.api.base_api + appglobal.api.get_all_location,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.data.data);
      })
      .catch(function (response) {
        console.log("Get All User", response);
      });
  }, []);

  // Add Edit
  const handleLocation = (values) => {
    // Send Data Via Form-data Format
    const formData = new FormData();
    formData.append("city", values.city);
    formData.append("state_id", values.state_id);
    formData.append("state_name", values.state_name);
    formData.append("county", values.county);
    formData.append("timezone", values.timezone);

    axios({
      method: "post",
      url: appglobal.api.base_api + appglobal.api.add_location,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
          console.log(response)
      })
      .catch(function (response) {
        //handle error
        console.log(response.response);
      });
  };
  
  

  return (
    <>
      <Header></Header>
      <Formik
        enableReinitialize={true}
        initialValues={{
          city: "",
          state_id: "",
          state_name: "",
          county: "",
          timezone: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={yup.object({
          city: yup.string().required("city Required"),
          state_id: yup.string().required("state_id Required"),
          state_name: yup.string().required("state_name Required"),
          county: yup.string().required("county Required"),
          timezone: yup.string().required("timezone Required"),
        })}
        onSubmit={(values) => {
          handleLocation(values);
        }}
      >
        <Form className={style.form}>
          <div className={style.inputcontainer}>
            <Field
              name="city"
              type="text"
              className="txtInput"
              placeholder="Please enter City"
              // defaultValue="aasjahskj"
            ></Field>
            <div className={style.text_danger}>
              <ErrorMessage name="city"></ErrorMessage>
            </div>
          </div>
          <Field
            name="state_id"
            type="text"
            className="txtInput"
            placeholder="Please enter State"
            // defaultValue="aasjahskj"
          ></Field>
          <div className={style.text_danger}>
            <ErrorMessage name="state_id"></ErrorMessage>
          </div>
          <Field
            name="state_name"
            type="text"
            className="txtInput"
            placeholder="Please enter state_name"
            // defaultValue="aasjahskj"
          ></Field>
          <div className={style.text_danger}>
            <ErrorMessage name="state_name"></ErrorMessage>
          </div>
          <Field
            name="county"
            type="text"
            className="txtInput"
            placeholder="Please enter county"
            // defaultValue="aasjahskj"
          ></Field>
          <div className={style.text_danger}>
            <ErrorMessage name="county"></ErrorMessage>
          </div>
          <Field
            name="timezone"
            type="text"
            className="txtInput"
            placeholder="Please enter timezone"
            // defaultValue="aasjahskj"
          ></Field>
          <div className={style.text_danger}>
            <ErrorMessage name="timezone"></ErrorMessage>
          </div>

          <button type="submit" className={style.button}>
            submit
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default login;
