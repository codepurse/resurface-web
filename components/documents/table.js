import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";

{
  /* Fake data */
}
import "../../services/api";

function table() {
  return (
    <>
      <Row>
        <Col lg={6}>
          <p>Documents</p>
          <p>All Documents relating to the app are stored here.You will find updated documents or create one. </p>
        </Col>
        <Col lg = {6}>
            <button className = "btnCreateDocu">Create document</button>
        </Col>
      </Row>
    </>
  );
}

export default table;
