import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Adduser from "../../components/directory/adduser";
import appglobal from "../../services/api.service";

const permission = (value) => {
  switch (value) {
    case "admin":
      return "pAdmin";
    case "clinician":
      return "pClinician";
  }
};

const status = (value) => {
  switch (value) {
    case "Active":
      return "pActive";
    case "Draft":
      return "pDraft";
    case "Archive":
      return "pDraft";
  }
};

function directory() {
  const [show, setShow] = useState(false);
  const [clinicians, setClinicians] = useState(null);
  const [clinicianId, setClinicianId] = useState(null);
  const [deleteUserTrigger, setDeleteUserTrigger] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


 

  // Get All User
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: appglobal.api.base_api + appglobal.api.get_all_clinicians,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.data.data);
        setClinicians(response.data.data);
      })
      .catch(function (response) {
        console.log("Get All User", response);
      });
  }, [deleteUserTrigger]);

  // Delete User
  const handleDeleteUser = (value) => {
    const token = localStorage.getItem("token");
    axios({
      method: "delete",
      url:
        appglobal.api.base_api + appglobal.api.delete_clinician + clinicianId,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
        setDeleteUserTrigger(!deleteUserTrigger);
        handleClose();
      })
      .catch(function (response) {
        console.log("HandleDeleteUser", response);
        //handle error
      });
  };

  function addNew() {
    $(".rowDirectory").hide();
    $(".conAdduser").fadeIn();
  }
  const myTheme = {
    // Theme object to extends default dark theme.
  };

  function editClinician() {
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
                {clinicians !== null &&
                  clinicians.map((event) => (
                    <tr>
                      <td>
                        <div className="form-inline">
                          <img src={event.image}></img>
                          <span>
                            {event.first_name}
                            <br></br>
                            <span> {event.location}</span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <p>{event.user.email}</p>
                      </td>
                      <td>
                        <p className={permission(event.user.roles[0].name)}>
                          {event.user.roles[0].name == "admin"
                            ? "Admin"
                            : "Clinician"}
                        </p>
                      </td>
                      <td>
                        <p
                          className={status(
                            event.status == 1
                              ? "Active"
                              : event.status == 2
                              ? "Draft"
                              : "Archive"
                          )}
                        >
                          {event.status == 1
                            ? "Active"
                            : event.status == 2
                            ? "Draft"
                            : "Archive"}
                        </p>
                      </td>
                      <td>
                        <button onClick={handleShow}>
                          <img
                            className="imgAction"
                            src="Image/icon/delete.png"
                            onClick={() => {
                              setClinicianId(event.user_id);
                            }}
                          ></img>
                        </button>
                        <button onClick={editClinician}>
                          
                          <img
                            onClick={() => {
                              setClinicianId(event.user_id);
                            }}
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
                  <button
                    onClick={() => {
                      handleDeleteUser();
                    }}
                    className="btnDeleteAccount"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleClose();
                    }}
                    className="btnDeleteAccount"
                  >
                    Cancel
                  </button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
      <Container fluid className="conAdduser">
        <Adduser></Adduser>
      </Container>
    </>
  );
}

export default directory;
