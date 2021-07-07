import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function eventAdd() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
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
        <>
        <p className="pModalheader">New time entry</p>
          <p className="pModalheadersub">
            This section contains all basic details of the time entry.
          </p>
          <Container className="modal-details">
            <Row>
              <Col lg={6}>
                <p className="pModalheadertext">Date</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Col>
              <Col lg={6}>
                <p className="pModalheadertext">Start</p>
                <DatePicker
                  selected={startTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  onChange={(date) => setStartTime(date)}
                />
              </Col>
              <Col lg={12}>
                <p className="pModalheadertext">Clinician</p>
                <Select options={options} styles={customStyles} isMulti />
              </Col>
              <Col lg={6}>
                <p className="pModalheadertext">Project/Client</p>
                <Select options={options} styles={customStyles} />
              </Col>
              <Col lg={6}>
                <p className="pModalheadertext">Activity type</p>
                <Select options={options} styles={customStyles} />
              </Col>
              <Col lg={12}>
                <p className="pModalheadertext">Notes</p>
                <textarea rows="2" cols="50"></textarea>
              </Col>
              <Col lg={12}>
                <div className="form-inline float-right">
                  <button className = "btnCancelEvent" onClick={handleClose}>Cancel</button>
                  <button className="btnSaveEvent">Save</button>
                </div>
              </Col>
            </Row>
          </Container>
        </>
    )
}

export default eventAdd;