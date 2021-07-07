import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function eventAdd() {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

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
        <p className="pModalheader">Create event</p>
          <p className="pModalheadersub">
            This section contains all basic details of your events.
          </p>
          <Container className="modal-details">
            <Row>
              <Col lg={12}>
                <p className="pModalheadertext">Event Name</p>
                <input type="text" className="txtInput"></input>
              </Col>
              <Col lg={4}>
                <p className="pModalheadertext">Date</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Col>
              <Col lg={4}>
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
              <Col lg={4}>
                <p className="pModalheadertext">End</p>
                <DatePicker
                  selected={endTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  onChange={(date) => setEndTime(date)}
                />
              </Col>
              <Col lg={6}>
                <p className="pModalheadertext">Location</p>
                <input type="text" className="txtInput"></input>
              </Col>
              <Col lg={6}>
                <p className="pModalheadertext">Host</p>
                <Select options={options} styles={customStyles} />
              </Col>
              <Col lg={12}>
                <p className="pModalheadertext">Participants</p>
                <Select options={options} styles={customStyles} isMulti />
              </Col>
              <Col lg={12}>
                <p className="pModalheadertext">Commentary</p>
                <textarea rows="2" cols="50"></textarea>
              </Col>
              <Col lg={12}>
                <p className="pModalheadertext">Notes</p>
                <textarea rows="2" cols="50"></textarea>
              </Col>
              <Col lg={12}>
                <div className="form-inline float-right">
                  <button className = "btnCancelEvent">Cancel</button>
                  <button className="btnSaveEvent">Save</button>
                </div>
              </Col>
            </Row>
          </Container>
        </>
    )
}

export default eventAdd;