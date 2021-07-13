import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Eventadd from "../dashboard/eventAdd";
import axios from "axios";
import moment from "moment";
{
  /* Fake data */
}
import "../../services/api";

function appointment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [event, setEventlist] = useState([]);

  const getEvents = async () => {
    await axios({
       method: "get",
       url: appglobal.api.base_api + appglobal.api.get_events + '?clinician_id=5',
       headers: { "Content-Type": "multipart/form-data" },
     })
       .then(function (response) {
         setEventlist(response.data.data);
         console.log(response.data.data);
       })
       .catch(function (response) {
         console.log(response.response);
       });
   };
 
   useEffect(()=>{
     getEvents()
  },[])


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
                      <th>Start</th>
                      <th>End</th>
                      <th>Event Name</th>
                      <th>Event Type</th>
                      <th>Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.map((event) => (
                      <tr>
                        <td>
                          <p>
                            <img src="../Image/icon/duration.png"></img>
                            {moment(event.date_from).format('MMMM Do YYYY, h:mm:ss a')}
                          </p>
                        </td>
                        <td>
                          <p>
                            <img src="../Image/icon/duration.png"></img>
                            {moment(event.date_to).format('MMMM Do YYYY, h:mm:ss a')}
                          </p>
                        </td>
                        <td>
                          <p>{event.subject}</p>
                        </td>
                        <td>
                          <p
                            className={
                              event.event_type == "Business" ? "pBuss" : "pSession"
                            }
                          >
                            {event.event_type}
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
