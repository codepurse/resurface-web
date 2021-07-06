import React, { Component, useState, useEffect, useRef } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Appointment from "../components/dashboard/appointment";
import { Container, Row, Col } from "react-bootstrap";
function index() {
  const [fname, setFname] = React.useState("Jason");
  const [newmess, setNewmess] = React.useState(2);
  const [appointment, setAppointment] = React.useState(0);

  function setActive(e) {
    $(".ulDashboard>li").removeClass("activeUl");
    $(e.currentTarget).addClass("activeUl");
  }

  return (
    <>
      <Sidebar></Sidebar>
      <Navbar></Navbar>
      <Container fluid className="divDashboard">
        <Row>
          <Col lg={12}>
            <p className="pWelcome">Welcome, {fname} </p>
            <p className="pNew">
              You have {newmess} new messages and {appointment} upcoming
              appointments.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <ul className="ulDashboard">
              <li onClick={setActive} className="activeUl">
                Appointments
              </li>
              <li onClick={setActive}>Time Entries</li>
              <li onClick={setActive}>Profile</li>
            </ul>
            <hr className="hrDashboard"></hr>
          </Col>
        </Row>
        <Appointment></Appointment>
      </Container>
    </>
  );
}
export default index;
