import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Adduser from "../../components/directory/adduser";
/* Fake data */
import "../../services/api";

const permission = (value) => {
  switch (value) {
    case "Super Admin":
      return "pAdmin";
    case "Clinician":
      return "pClinician";
  }
};

const status = (value) => {
  switch (value) {
    case "Active":
      return "pActive";
    case "Draft":
      return "pDraft";
  }
};

function directory() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addNew() {
    $(".rowDirectory").hide();
    $(".conAdduser").fadeIn();
  }
  return (
    <>
      <Row className="rowDirectory">
        <Col lg={6}>
          <p>Clinician Directory</p>
          <p>
            In this section, you can view and manage all records with their
            details. You can view edit many information.
          </p>
        </Col>
        <Col lg={6}>
          <button onClick={addNew}>Add New User</button>
        </Col>
      </Row>
      <Container fluid className="conEmrtable rowDirectory">
        <Row className="rowDirectory">
          <Col lg={12}>
            <Table responsive borderless className="tableDirectory">
              <thead>
                <tr>
                  <th>Name & Location</th>
                  <th>Email</th>
                  <th>Permission</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {directory_list.map((event) => (
                  <tr>
                    <td>
                      <div className="form-inline">
                        <img src={event.image}></img>
                        <span>
                          {event.name}
                          <br></br>
                          <span> {event.location}</span>
                        </span>
                      </div>
                    </td>
                    <td>
                      <p>{event.email}</p>
                    </td>
                    <td>
                      <p className={permission(event.type)}>{event.type}</p>
                    </td>
                    <td>
                      <p className={status(event.status)}>{event.status}</p>
                    </td>
                    <td>
                      <button onClick={handleShow}>
                        <img
                          className="imgAction"
                          src="Image/icon/delete.png"
                        ></img>
                      </button>
                      <button>
                        <img
                          className="imgAction"
                          src="Image/icon/edit.png"
                        ></img>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <Container>
              <Row>
                <Col lg={12}>
                  <p className="pModalTitle">
                    <img src="Image/icon/trash.png"></img>Delete account
                  </p>
                  <p className="pModalTitleSub">
                    Are you sure you want to delete this account?
                  </p>
                </Col>
                <Col lg={12}>
                  <button className="btnDeleteAccount">Delete</button>
                  <button className="btnDeleteAccount">Cancel</button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
      <Container fluid className = "conAdduser">
      <Adduser></Adduser>
      </Container>
    </>
  );
}

export default directory;
