import React, { Component, useState, useEffect, useRef } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Appointment from "../components/dashboard/appointment";
import TimeEntry from "../components/dashboard/time_entry";
import DocuTable from "../components/documents/table";
import Emr from "../components/emr/emr";
import Directory from "../components/directory/directory";
import Events from "../components/events/events"
import { Container, Row, Col } from "react-bootstrap";

function index() {
  const [fname, setFname] = React.useState("Jason");
  const [newmess, setNewmess] = React.useState(2);
  const [appointment, setAppointment] = React.useState(0);

  function setActive(e) {
    $(".ulDashboard>li").removeClass("activeUl");
    $(e.currentTarget).addClass("activeUl");

    if (e.currentTarget.id == "ulTime") {
      $(".divAppointment").hide();
      $(".divTimeEntry").fadeIn();
    } else if (e.currentTarget.id == "ulAppointment") {
      $(".divAppointment").fadeIn();
      $(".divTimeEntry").hide();
    }
  }

  return (
    <>
      <Sidebar></Sidebar>
      <Navbar></Navbar>
     <div>
     <Container fluid className="divDashboard divHidden">
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
              <li onClick={setActive} className="activeUl" id="ulAppointment">
                Appointments
              </li>
              <li onClick={setActive} id="ulTime">
                Time Entries
              </li>
              <li onClick={setActive} id="ulProfile">
                Profile
              </li>
            </ul>
            <hr className="hrDashboard"></hr>
          </Col>
        </Row>
        <div className="divAppointment">
          <Appointment></Appointment>
        </div>
        <div className="divTimeEntry">
          <TimeEntry></TimeEntry>
        </div>
      </Container>
      <Container fluid className="divDocuments divHidden" id="divDocuments">
        <DocuTable></DocuTable>
      </Container>
      <Container fluid className = "divEmr divHidden" id = "divEmr">
        <Emr></Emr>
      </Container>
      <Container fluid className = "divDirectory divHidden" id = "divDirectory">
        <Directory></Directory>
      </Container>
      <Container fluid className = "divEvents divHidden" id = "divEvents">
    <Events></Events>
      </Container>
     </div>
    </>
  );
}
export default index;
