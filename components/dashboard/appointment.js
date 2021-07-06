import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalBody from "react-bootstrap/ModalBody";

function appointment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            Please put all the details of your events.
          </p>
          <div className="modal-details">
            <p className="pModalheadertext">Event Name</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default appointment;
