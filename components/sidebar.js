import React, { Component, useState, useEffect, useRef } from "react";
import Header from "../components/header";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function sidebar() {
  return (
    <>
      <Header />
      <Container className="h-100" id="sidebar">
        <Row className="h-100">
          <Col lg={12}>
            <Image
              fluid
              src="Image/Logo-white.png"
              alt="Resurface Logo"
              width={200}
              id="logo"
            />
            <input type="text" className="txtSearch" placeholder="Search" />
            <ul className="ulSidebar">
              <li>
                <img
                  src="Image/icon/home.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Dashboard</span>
              </li>
              <li>
                <img
                  src="Image/icon/emr.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Medical records</span>
              </li>
              <li>
                <img
                  src="Image/icon/notification.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Notifications</span>
                <div className="circle-with-text">2</div>
              </li>
            </ul>
            <hr className="hrSidebar"></hr>
            <ul className="ulSidebar">
              <li>
                <img
                  src="Image/icon/documents.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Documents</span>
              </li>
              <li>
                <img
                  src="Image/icon/message.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Messaging</span>
              </li>
              <li>
                <img
                  src="Image/icon/calendar.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Event calendar</span>
              </li>
              <li>
                <img
                  src="Image/icon/clock.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Time reporting</span>
              </li>
              <li>
                <img
                  src="Image/icon/folder.png"
                  className="img-fluid imgSidebar"
                ></img>
                <span>Clinician directory</span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default sidebar;
