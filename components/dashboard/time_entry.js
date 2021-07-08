import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import TimeAdd from "../dashboard/addTime";
{
  /* Fake data */
}
import "../../services/api";

function timeEntry() {
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
                    Time entry
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
          <Container fluid className = "conEmrtable">
          <Row>
              <Col lg={12}>
                <Table className = "tableTime" responsive borderless>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Project/Notes</th>
                      <th>Activity type</th>
                      <th>Clinician</th>
                      <th>Time logged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {time_entry.map((event) => (
                      <tr>
                        <td>
                          <p>{event.date}</p>
                        </td>
                        <td>
                          <p>{event.client}</p>
                          <p className="tableNotes">{event.notes}</p>
                        </td>
                        <td>
                          <p
                            className={
                              event.event_type == "Travel"
                                ? "pBuss"
                                : "pSession"
                            }
                          >
                            {event.event_type}
                          </p>
                        </td>
                        <td>
                          <p>
                            <img src={event.clinician[0].image} />
                            {event.clinician[0].name}
                          </p>
                        </td>
                        <td>
                          <p>{event.time}</p>
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
          <TimeAdd />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default timeEntry;
