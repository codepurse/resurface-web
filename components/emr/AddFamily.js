import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
import moment from "moment";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appglobal from "../../services/api.service";

function AddFamily() {
  const [locations,setLocations] = useState([])

  // Get location
  useEffect(()=>{
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
        console.log(response.data.data)
        setLocations(response.data.data)
      })
      .catch(function (response) {
        console.log("Get All User", response);
      });

  },[])

  const options = [
    { value: "Session", label: "Session" },
    { value: "Business", label: "Business" },
  ];
 

  

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F7F8FA",
      color: "#212121",
      border: "2px solid #EEEEEE",
      boxShadow: "none",
      borderRadius: "5px",
      width: "100%",
      padding: "1px",
      marginTop: "5px",
      fontFamily: "Roboto",
      boxShadow: state.isFocused ? "#003171" : null,
      "&:hover": {
        borderColor: state.isFocused ? "#003171" : "",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#212121",
    }),
  };

  return (
    <Formik
      enableReinitialize = {true}
      initialValues={{
        family_name: "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object({
        family_name: yup
          .string()

          .required("Please Enter Family Name"),
      })}
      onSubmit={(values) => {
        alert(JSON.stringify(values));
      }}
    >
        <>
          <p className="pModalheader">Add Family</p>
          <p className="pModalheadersub">
            This section contains all basic details of your family.
          </p>
          <Container className="modal-details">
            <Form>
              <Row>
                
                <Col lg={12}>
                  <p className="pModalheadertext">Family Name</p>
                  <Field
                    name="family_name"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="family_name"></ErrorMessage>
                  </div>
                </Col>
                <Col lg={4}>
                =
              </Col>
                <Col lg={12}>
                  
                  <div className="form-inline float-right">
                    <button
                    type="button"
                      onClick={() => {
                        console.log('s');
                      }}
                      className="btnCancelEvent"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btnSaveEvent">
                      Save
                    </button>
                  </div>
                </Col>
                
              </Row>
            </Form>
          </Container>
        </>
    </Formik>
  );
}

export default AddFamily;
