import React, { Component, useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import appglobal from "../../services/api.service";
import style from "../../styles/login.module.scss";

function adduser() {
  const router = useRouter();
  const [userType,setUserType] = useState(null)
  const [locationsId, setLocationsId] = useState([]);
  const [image,setImage] = useState(null)
  const handleSubmit = (values) =>{
    const token = localStorage.getItem("token");

    const locationValue = locationsId.map(
      (locationId) => locationId.value
    );

    const formData = new FormData();
    formData.append("first_name", values.firstname);
    formData.append("middle_name", values.middlename);
    formData.append("last_name", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", userType.value);
    formData.append("photo", image);
    for (let i = 0; i < locationValue.length; i++) {
      formData.append(
        `locations[${i}][id]`,
        locationValue[i]
      );
    }

    console.log(inputFields)



    for (var pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]); 
  }

  // axios({
  //   method: "post",
  //   url: appglobal.api.base_api + appglobal.api.add_clinician,
  //   data: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: "Bearer " + token,
  //   },
  // })
  //   .then(function (response) {
  //     //handle success
  //     console.log(response);
  //     setTrigger(!trigger);
  //     handleCloseEvent();
  //   })
  //   .catch(function (response) {
  //     //handle error
  //     console.log(response.response);
  //   });


  }

  const inputFileRef = useRef(null);
  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), phonenumber: "", type: "" },
  ]);

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), phonenumber: "", type: "" },
    ]);
  };
  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  function setActive(e) {
    $(".ulDashboard>li").removeClass("activeUl");
    $(e.currentTarget).addClass("activeUl");

    if (e.currentTarget.id == "ulTime") {
      $(".divAppointment").hide();
      $(".divTimeEntry").fadeIn();
    } else if (e.currentTarget.id == "ulAppointment") {
      $(".divAppointment").fadeIn();
      $(".divTimeEntry").hide();
    }
  }

  const options_type = [
    { value: "Admin", label: "admin" },
    { value: "Clinician", label: "clinician" },
  ];

  const options_status = [
    { value: "Active", label: "Active" },
    { value: "Draft", label: "Draft" },
    { value: "Archive", label: "Archive" },
  ];

  const options_location = [
    { value: 1, label: "Orange " },
    { value: 2, label: "Los angeles" },
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
      fontFamily: "Inter",
      fontWeight: "600",
    }),
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object({
        firstname: yup
          .string()
          .required("Firstname Required"),
        middlename: yup
          .string()
          .required("Middlename Required"),
        lastname: yup
          .string()
          .required("Lastname Required"),
        email: yup
          .string()
          .email()
          .required("Email Required"),
        password: yup
          .string()
          .required("Password Required")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),

        confirm_password: yup
          .string()
          .min(8)
          .required("Password Required")
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
              [yup.ref("password")],
              "Password does not match"
            ),
          }),

      })}
      onSubmit={(values) => {
        console.log(values)
        handleSubmit(values)
      }}
    >
      <Form>
        <Row>
          <Col lg={12}>
            <p>Add Staff</p>
            <p>
              In this section be sure to fill all information requested. Do not
              save without completing all required information.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <ul className="ulDashboard">
              <li onClick={setActive} className="activeUl" id="ulAppointment">
                Demographics
              </li>
              <li onClick={setActive} id="ulTime">
                Event Calendar
              </li>
              <li onClick={setActive} id="ulProfile">
                Time Reports
              </li>
            </ul>
            <hr className="hrDashboard"></hr>
          </Col>
        </Row>
        <Row>
          <Container className="conAdd">
            <Row>
              <Col lg={12}>
                <p className="pHeaderAdd">Administrative controls</p>
                <hr></hr>
              </Col>
              <Col lg={4}>
                <p className="pHeaderAddsub">User Type</p>
                <Select
                  options={options_type}
                  styles={customStyles}
                  placeholder="Select .."
                  onChange={(e)=>{setUserType(e)}}
                />
              </Col>
              <Col lg={4}>
                <p className="pHeaderAddsub">User Status</p>
                <Select
                  options={options_status}
                  styles={customStyles}
                  placeholder="Select .."
                />
              </Col>
              <Col lg={4}>
                <p className="pHeaderAddsub">Location</p>
                <Select
                  onChange={(e)=>setLocationsId(e)}
                  options={options_location}
                  styles={customStyles}
                  placeholder="Select .."
                  isMulti
                />
              </Col>

              <Col lg={12}>
                <br></br>
                <p className="pHeaderAdd">User Information</p>
                <hr></hr>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Row>
                  <Col lg={4}>
                    <p className="pHeaderAddsub">First Name</p>
                    <Field
                      name="firstname"
                      type="text"
                      className="txtInput"
                    ></Field>
                    <div className={style.text_danger}>
                      <ErrorMessage name="firstname"></ErrorMessage>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <p className="pHeaderAddsub">Middle Name</p>
                    <Field
                      name="middlename"
                      type="text"
                      className="txtInput"
                    ></Field>
                    <div className={style.text_danger}>
                      <ErrorMessage name="middlename"></ErrorMessage>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <p className="pHeaderAddsub">Last Name</p>
                    <Field
                      name="lastname"
                      type="text"
                      className="txtInput"
                    ></Field>
                    <div className={style.text_danger}>
                      <ErrorMessage name="lastname"></ErrorMessage>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <p className="pHeaderAddsub">Email Address</p>
                <Field
                      name="email"
                      type="text"
                      className="txtInput"
                    ></Field>
                    <div className={style.text_danger}>
                      <ErrorMessage name="email"></ErrorMessage>
                    </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <p className="pHeaderAddsub">Staf Image</p>
                <input
                  onChange={(e) => setImage(e.target.value)}
                  ref={inputFileRef}
                  id="file-upload"
                  type="file"
                  accept=".jpg, .png, .jpeg|image"
                  className="d-none"
                />
                <div className="divUpload" onClick={onBtnClick}>
                  <div className="mx-auto">
                    <img
                      src="Image/icon/upload.png"
                      className="img-fluid mx-auto d-flex"
                    ></img>
                    <p>Browse your files here</p>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <Row>
                  <Col lg={12}>
                    {inputFields.map((inputField) => (
                      <Row>
                        <Col lg={5} key={inputField.id}>
                          <p className="pHeaderAddsub">Phone Number</p>
                          <input type="text" name = "phonenumber" value={inputField.phonenumber} onChange={event => handleChangeInput(inputField.id, event)} className="txtInput"></input>
                        </Col>
                        <Col lg={4}>
                          <p className="pHeaderAddsub">Type</p>
                          <Select
                            options={options_status}
                            styles={customStyles}
                            placeholder="Select .."
                          />
                        </Col>
                        <Col lg={3}>
                          <button className="btnDeletePhone" onClick={() => handleRemoveFields(inputField.id)}>Delete</button>
                        </Col>
                      </Row>
                    ))}
                    <p className="pAddnum" onClick={handleAddFields}>
                      Add phone number
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <p className="pHeaderAddsub">Password</p>
                    <Field
                      name="password"
                      type="password"
                      className="txtInput"
                    ></Field>
                    <div className={style.text_danger}>
                      <ErrorMessage name="password"></ErrorMessage>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <p className="pHeaderAddsub">Confirm Password</p>
                    <Field
                      name="confirm_password"
                      type="password"
                      className="txtInput"
                    ></Field>
                    <div className={style.text_danger}>
                      <ErrorMessage name="confirm_password"></ErrorMessage>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <button type="submit" className="btnSaveEvent">
                  Save
                </button>
                <button type="button" onClick={()=>{console.log(inputFields)}} >Cancel</button>
              </Col>
            </Row>
          </Container>
        </Row>
      </Form>
    </Formik>
  );
}

export default adduser;
