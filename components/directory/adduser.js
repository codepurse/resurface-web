import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

function addUser() {
  const inputFileRef = useRef(null);
  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), phonenumber: "", type: "" },
  ]);

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), firstName: "", lastName: "" },
    ]);
  };
  const handleRemoveFields = id => {
    const values  = [...inputFields];
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
    { value: "Super Admin", label: "Super Admin" },
    { value: "Clinician", label: "Clincian" },
  ];

  const options_status = [
    { value: "Active", label: "Active" },
    { value: "Draft", label: "Draft" },
    { value: "Archive", label: "Archive" },
  ];

  const options_location = [
    { value: "Orange country", label: "Orange country" },
    { value: "Los angeles", label: "Los angeles" },
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
    <>
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
                  <input type="text" className="txtInput"></input>
                </Col>
                <Col lg={4}>
                  <p className="pHeaderAddsub">Middle Name</p>
                  <input type="text" className="txtInput"></input>
                </Col>
                <Col lg={4}>
                  <p className="pHeaderAddsub">Last Name</p>
                  <input type="text" className="txtInput"></input>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <p className="pHeaderAddsub">Email Address</p>
              <input type="text" className="txtInput"></input>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <p className="pHeaderAddsub">Staf Image</p>
              <input
                onChange={(e) => handleFile(e)}
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
                      <Col lg={5}>
                        <p className="pHeaderAddsub">Phone Number</p>
                        <input type="text"  value={inputField.phonenumber} className="txtInput"></input>
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
                  <input type="text" className="txtInput"></input>
                </Col>
                <Col lg={6}>
                  <p className="pHeaderAddsub">Confirm Password</p>
                  <input type="text" className="txtInput"></input>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <button>Save</button>
              <button>Cancel</button>
            </Col>
          </Row>
        </Container>
      </Row>
    </>
  );
}

export default addUser;
