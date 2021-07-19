import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useTable, useExpanded } from 'react-table';
import AddFamily from './AddFamily'
import AddClient from './AddClient'
import axios from "axios";
import appglobal from "../../services/api.service";
import moment from "moment";

/* Fake data */
import "../../services/api";

function emr() {
  const [families,setFamilies] = useState([])
  const [family,setFamily] = useState(null)
  const [show, setShow] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [deleteConfirmationShow,setDeleteConfirmationShow] = useState(false)
  const [startDate, setStartDate] = useState("");
  const [trigger,setTrigger] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseClients = () => setShowClients(false);
  const handleShowClients = () => setShowClients(true);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  var options_date = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function newdate(datetable) {
    var new_date = new Date(datetable);
    return new_date;
  }


  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F7F8FA",
      color: "#212121",
      border: "2px solid #f5f5f5",
      boxShadow: "none",
      borderRadius: "8px",
      width: "150px",
      padding: "1px",
      marginTop: "4px",
      fontFamily: "Inter",
      fontWeight: "500",
      marginRight: "10px",
      boxShadow: state.isFocused ? "#003171" : null,
      "&:hover": {
        borderColor: state.isFocused ? "#003171" : "",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#212121",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "gray",
        fontFamily: "Inter",
      };
    },
  };

  // Get All families

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: appglobal.api.base_api + appglobal.api.get_all_family,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        //handle success
        setFamilies(response.data.data)
        console.log("families", response.data.data);
      })
      .catch(function (response) {
        console.log("Get All User", response);
      });
  }, [trigger]);

  // Handle Delete Family
  const handleDeleteFamily = (value) => {
    // const token = localStorage.getItem("token");
    // axios({
    //   method: "delete",
    //   url: appglobal.api.base_api + appglobal.api.delete_location + family.id,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    // })
    //   .then(function (response) {
    //     //handle success
    //     console.log(response.data);
    //   })
    //   .catch(function (response) {
    //     console.log("handleDeleteLocation", response);
    //     //handle error
    //   });
    console.log(family.id)
  };

  return (
    <>
      <Row>
        <Col lg={6}>
          <p>Medical Records</p>
          <p>
            In this section, you can view and manage all records with their
            details. You can view edit many information.
          </p>
        </Col>
        <Col lg={6}>
          <div className="form-inline float-right">
            <button onClick={()=>handleShowClients()} >Add New Client</button>
            <button onClick={() => handleShow()} >Add New Family</button>
          </div>
        </Col>
      </Row>
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
                  <Select
                    options={options}
                    styles={customStyles}
                    placeholder="Location .."
                  />
                  <Select
                    options={options}
                    styles={customStyles}
                    placeholder="Status .."
                  />
                  <DatePicker
                    selected={startDate}
                    pla
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Date .."
                  />
                  <button className="btnSearch">
                    <img
                      className="img-fluid"
                      src="../Image/icon/enter.png"
                    ></img>
                    Search
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Container fluid className="conEmrtable">
        <Row>
          <Col lg={12}>
            <Table className="tableEmr" responsive borderless>
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Location</th>
                  <th>Created Date</th>
                  <th>Members Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {families.map((event) => (
                  <tr>
                    <td>
                      <p>{event.family_name}</p>
                    </td>
                    <td>
                      <p>{event.city}</p>
                    </td>
                    <td>
                      <p>{moment(event.created_at).format("YYYY/MM/DD")}</p>
                    </td>
                    <td>
                      <p>{event.count}</p>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setDeleteConfirmationShow(true);
                          setFamily(event);
                        }}
                      >
                        <img
                          className="imgAction"
                          src="Image/icon/delete.png"
                        ></img>
                      </button>
                      <button
                        onClick={() => {
                          setEditable(true);
                          handleShow();
                          setLocationId(event.id);
                          setEditableLocation(event);
                          setSelectedTimezone({})
                        }}
                      >
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
      </Container>

      {/* Add Family Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
         <AddFamily
          handleClose = {handleClose}
         />
        </Modal.Body>
      </Modal>
      {/* Add Client Modal */}
      <Modal show={showClients} onHide={handleCloseClients} centered>
        <Modal.Body>
         <AddClient
          handleCloseClients = {handleCloseClients}
         />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation */}
      <Modal show={deleteConfirmationShow} onHide={()=>setDeleteConfirmationShow(false)} centered>
        <Modal.Body>
          <Container>
            <Row>
              <Col lg={12}>
                <p className="pModalTitle">
                  <img src="Image/icon/trash.png"></img>Delete account
                </p>
                <p className="pModalTitleSub">
                  Are you sure you want to delete this Family Details?
                </p>
              </Col>
              <Col lg={12}>
                <button
                  onClick={() => {
                    handleDeleteFamily();
                    setDeleteConfirmationShow(false);
                    setTrigger(!trigger);
                  }}
                  className="btnDeleteAccount"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setDeleteConfirmationShow(false);
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
    </>
  );
}

export default emr;
