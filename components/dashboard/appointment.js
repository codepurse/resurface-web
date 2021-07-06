import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalBody from "react-bootstrap/ModalBody";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function appointment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const appointment_list = [
    {
      id: 1,
      time_start: "11:30 am",
      time_end: "12:00 pm",
      date: "06/28/2021",
      duration: "30 min",
      name: "Quick meeting",
      type: "Business",
      location: "Philippines",
      Host: "Jason Brumback",
      participants: [
        {
          name: "Mike boyer",
          image: "",
        },
        {
          name: "Matt cheney",
          image: "",
        },
      ],
      commentary: "asdasdasadasdsadasdasdasdasd",
      notes: "For testing purposes",
    },
    {
      id: 2,
      time_start: "2:30 am",
      time_end: "4:00 pm",
      date: "06/30/2021",
      duration: "2:30 min",
      name: "Session with my patient",
      type: "Session",
      location: "Philippines",
      Host: "Jason Brumback",
      participants: [
        {
          name: "Mike boyer",
          image: "",
        },
        {
          name: "Matt cheney",
          image: "",
        },
      ],
      commentary: "asdasdasadasdsadasdasdasdasd",
      notes: "For testing purposes",
    },
  ];

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
      <Row>
        <Col lg={12}>
          <Container fluid className="divSearch">
            <Row>
              <Col lg={12}>
                <div className="form-inline">
                  <input
                    type="text"
                    className="txtSearch"
                    placeholder="Search for clients, event types ..."
                  ></input>
                  <button className="btnSearch">
                    <img
                      className="img-fluid"
                      src="../Image/icon/enter.png"
                    ></img>
                    Search
                  </button>
                  <button className="btnAdd" onClick={handleShow}>
                    <img
                      className="img-fluid"
                      src="../Image/icon/add.png"
                    ></img>
                    New event
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Table responsive borderless>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Duration</th>
                      <th>Event name</th>
                      <th>Event type</th>
                      <th>Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointment_list.map((event) => (
                      <tr>
                        <td>
                          <p>{event.date}</p>
                        </td>
                        <td>
                          <p>
                            <img src="../Image/icon/clock_blue.png"></img>
                            {event.time_start} - {event.time_end}
                          </p>
                        </td>
                        <td>
                          <p>
                            <img src="../Image/icon/duration.png"></img>
                            {event.duration}
                          </p>
                        </td>
                        <td>
                          <p>{event.name}</p>
                        </td>
                        <td>
                          <p
                            className={
                              event.type == "Business" ? "pBuss" : "pSession"
                            }
                          >
                            {event.type}
                          </p>
                        </td>
                        <td>
                          <img
                            src="../Image/profile.jpg"
                            className="img-fluid"
                          ></img>
                          <img
                            src="../Image/images.jpg"
                            className="img-fluid"
                          ></img>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
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
                <textarea rows="2" cols="50">
                 
                </textarea>
              </Col>
              <Col lg={12}>
                <p className="pModalheadertext">Notes</p>
                <textarea rows="2" cols="50">
                 
                </textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default appointment;
