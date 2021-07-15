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

function eventAdd({ handleCloseEvent, trigger, setTrigger, setEditable, editable, calendarlist,handleClose }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [participants, setParticipants] = useState([]);
  const [participantsId, setParticipantsId] = useState([]);
  const [eventType, setEventType] = useState( editable !==true ? {value: "Session", label: "Session"}:{ value: calendarlist.event_type, label: calendarlist.event_type});

  // Get all Participants
  useEffect(() => {
    console.log("CLINICIAN",calendarlist)
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: appglobal.api.base_api + appglobal.api.get_all_clinicians,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        //handle success
        setParticipants(response.data.data);
      })
      .catch(function (response) {
        console.log(" get all Participants", response);
      });
  }, []);

  // Handle Add event
  const handleAddEvent = (values) => {
    if (participantsId >= 0) {
      alert("Please add participants");
    } else {

      const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const clinician_id = localStorage.getItem("clinician_id");
        const participantValue = participantsId.map(
          (participantId) => participantId.value
        );
        const formData = new FormData();
        formData.append("clinician_id", clinician_id);
        formData.append(
          "date_from",
          moment(startDate).format("YYYY/MM/DD h:mm:ss")
        );
        formData.append(
          "date_to",
          moment(endDate).format("YYYY/MM/DD h:mm:ss")
        );
        formData.append("subject", values.event_name);
        formData.append("location", values.location);
        formData.append("notes", values.notes);
        formData.append("event_type", eventType.value);
        formData.append("description", values.commentary);
        for (let i = 0; i < participantValue.length; i++) {
          formData.append(
            `participants[${i}][clinician_id]`,
            participantValue[i]
          );
        }

        for (var pair of formData.entries()) {
          console.log(pair[0]+ ' - ' + pair[1]); 
      }

      if(editable !== true){
        // HandleAddEvent
        axios({
          method: "post",
          url: appglobal.api.base_api + appglobal.api.add_event,
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


      }else{
        // Handle Edit Event
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
    }
  };

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
        event_name: editable !==true ?"":calendarlist.subject,

        location: editable !==true ?"":calendarlist.location,

        commentary: editable !==true ?"":calendarlist.description,

        notes: editable !==true ?"":calendarlist.notes,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object({
        event_name: yup
          .string()

          .required("Please Enter Event Name"),

        location: yup
          .string()

          .required("Please Enter Location"),
        commentary: yup
          .string()

          .required("Please Enter Commentary"),
        notes: yup
          .string()

          .required("Please Enter Notes"),
      })}
      onSubmit={(values) => {
        // alert(JSON.stringify(values));
        handleAddEvent(values);
      }}
    >
        <>
          <p className="pModalheader">{editable !== true ? "Create event" : "Edit Event"}</p>
          <p className="pModalheadersub">
            This section contains all basic details of your events.
          </p>
          <Container className="modal-details">
            <Form>
              <Row>
                <Col lg={12}>
                  <p className="pModalheadertext">Event Name</p>
                  <Field
                    name="event_name"
                    type="text"
                    className="txtInput"
                    // defaultValue="aasjahskj"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="event_name"></ErrorMessage>
                  </div>
                </Col>
                <Col lg={6}>
                  <p className="pModalheadertext">Start Date </p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    minDate={new Date()}
                  />
                </Col>
                <Col lg={6}>
                  <p className="pModalheadertext">End Date </p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    minDate={new Date()}
                  />
                </Col>
                <Col lg={6}>
                  <p className="pModalheadertext">Location</p>
                  <Field
                    name="location"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="location"></ErrorMessage>
                  </div>
                </Col>
                <Col lg={6}>
                  <p className="pModalheadertext">Event Type</p>
                  <Select
                    defaultValue={  editable !== true? { value: "Session", label: "Session" }  :{ value: calendarlist.event_type, label: calendarlist.event_type}}
                    options={options}
                    styles={customStyles}
                    onChange={(e) => {
                      setEventType(e);
                    }}
                  />
                </Col>
                <Col lg={12}>
                  <p className="pModalheadertext">Participants</p>
                  <Select
                    onChange={(e) => {
                      setParticipantsId(e);
                      console.log(e)
                    }}
                    options={participants.map((participant) => ({
                      label: participant.first_name,
                      value: participant.id,
                    }))}
                    styles={customStyles}
                    isMulti
                  />
                </Col>
                <Col lg={12}>
                  <p className="pModalheadertext">Commentary</p>
                  <Field
                    as="textarea"
                    name="commentary"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="commentary"></ErrorMessage>
                  </div>
                </Col>
                <Col lg={12}>
                  <p className="pModalheadertext">Notes</p>
                  <Field
                    as="textarea"
                    name="notes"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="notes"></ErrorMessage>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-inline float-right">
                    <button
                    type="button"
                      onClick={() => {
                        handleClose();
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

export default eventAdd;
