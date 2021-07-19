import React, { Component, useState, useEffect, useRef, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import TimezoneSelect from "react-timezone-select";
import axios from "axios";
import appglobal from "../../services/api.service";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

/* Fake data */
import "../../services/api";

function emr() {
  const [show, setShow] = useState(false);
  const [locations, setLocations] = useState([])
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [editable, setEditable] = useState(false)
  const [trigger,setTrigger] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get location
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
        console.log('Location', response.data.data)
        setLocations(response.data.data)
      })
      .catch(function (response) {
        console.log("Get All User", response);
      });

  }, [trigger])

  // HandleSubmitLocation 

  const handleSubmit = (values) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("city", values.city_name);
    formData.append("state_id", values.state_id);
    formData.append("state_name", values.state_name);
    formData.append("county", values.county);
    formData.append("timezone", selectedTimezone.value);
    if (editable !== true) {
      // handle Add Location
      axios({
        method: "post",
        url: appglobal.api.base_api + appglobal.api.add_location,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          handleClose();
          setTrigger(!trigger)
        })
        .catch(function (response) {
          //handle error
          console.log(response.response);
        });


    } else {
      // Handle Edit Location
      formData.append("_method", "PUT");
      axios({
        method: "post",
        url: appglobal.api.base_api + appglobal.api.update_event + calendarlist.id,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          setTrigger(!trigger);
          handleClose();
        })
        .catch(function (response) {
          //handle error
          console.log(response.response);
        });
    }

  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F7F8FA",
      color: "#212121",
      border: "2px solid #f5f5f5",
      boxShadow: "none",
      borderRadius: "8px",
      width: "100%",
      padding: "1px",
      marginTop: "4px",
      fontFamily: "Inter",
      fontWeight: "500",
      marginRight: "10px",
      boxShadow: state.isFocused ? "#003171" : null,
      "&:hover": {
        borderColor: state.isFocused ? "#003171" : "",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#212121",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "gray",
        fontFamily: "Inter",
      };
    },
  };

  const options = useMemo(() => countryList().getData(), []);

  return (
    <>
      <Row>
        <Col lg={6}>
          <p>Location Directory</p>
          <p>
            In this section, you can view and manage all records with their
            details. You can view edit many information.
          </p>
        </Col>
        <Col lg={6}>
          <div className="form-inline float-right">
            <button onClick={handleShow}>Add Location</button>
          </div>
        </Col>
      </Row>
      <Container fluid className="conEmrtable">
        <Row>
          <Col lg={12}>
            <Table className="tableLocation" responsive borderless>
              <thead>
                <tr>
                  <th>City</th>
                  <th>State</th>
                  <th>State name</th>
                  <th>county</th>
                  <th>Timezone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {locations.map((event) => (
                  <tr>
                    <td>
                      <p>{event.city}</p>
                    </td>
                    <td>
                      <p>{event.state_id}</p>
                    </td>
                    <td>
                      <p>{event.state_name}</p>
                    </td>
                    <td>
                      <p>{event.county}</p>
                    </td>
                    <td>{event.timezone}</td>
                    
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal size="sm" show={show} onHide={handleClose} centered>
        <Formik
          enableReinitialize={true}
          initialValues={{
            city_name: "",
            state_id: "",
            state_name: "",
            county:""
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={yup.object({
            city_name: yup
              .string()

              .required("Please Enter City"),
              state_id: yup
              .string()

              .required("Please Enter State Id"),
              state_name: yup
              .string()

              .required("Please Enter State Name"),
              county: yup
              .string()

              .required("Please Enter County"),
          })}
          onSubmit={(values) => {
            // alert(JSON.stringify(values));
            handleSubmit(values);
          }}
        >

          <Modal.Body>
            <p className="pModalheader">Create location</p>
            <p className="pModalheadersub">Fill up all the missing fields.</p>
            <Container className="modal-details">
            <Form>
              <Row>
                <Col lg={12}>
                  <p className="pModalheadertext">City</p>
                  <Field
                    name="city_name"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="city_name"></ErrorMessage>
                  </div>
                  <p className="pModalheadertext">State Id</p>
                  <Field
                    name="state_id"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="state_id"></ErrorMessage>
                  </div>
                  <p className="pModalheadertext">State Name</p>
                  <Field
                    name="state_name"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="state_name"></ErrorMessage>
                  </div>
                  <p className="pModalheadertext">County</p>
                  {/* <Select options={options} styles={customStyles} onChange={e=>console.log(e)} /> */}
                  <Field
                    name="county"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="county"></ErrorMessage>
                  </div>
                  <p className="pModalheadertext">Time Zone</p>
                  <TimezoneSelect
                    value={selectedTimezone}
                    onChange={e=>setSelectedTimezone(e)}
                    styles={customStyles}
                  />
                </Col>
                <Col lg={6}>
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                    }}
                    className="btnCancelLocation"
                  >
                    Cancel
                  </button>
                </Col>
                <Col lg={6}>
                  <button type="submit" className="btnSaveLocation">
                    Save
                  </button>
                </Col>
              </Row>
              </Form>
            </Container>
          </Modal.Body>
        </Formik>
      </Modal>
    </>
  );
}

export default emr;
