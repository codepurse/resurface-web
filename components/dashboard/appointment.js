import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Eventadd from "../dashboard/eventAdd";

{
  /* Fake data */
}
import "../../services/api";

function appointment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                    placeholder="Search .."
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
          </Container>
          <Container fluid className="conEmrtable">
              <Row>
                <Col lg={12}>
                  <Table className="tableAppointment" responsive borderless>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Event Name</th>
                        <th>Event Type</th>
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
          <Eventadd></Eventadd>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default appointment;
