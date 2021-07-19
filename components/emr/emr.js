import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useTable, useExpanded } from 'react-table';
import AddFamily from './AddFamily'

/* Fake data */
import "../../services/api";

function emr() {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            <button>Add New Client</button>
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
                  <th>Client</th>
                  <th>Location</th>
                  <th>Created Date</th>
                  <th>Members Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {emr_list.map((event) => (
                  <tr>
                    <td>
                      <p>{event.family}</p>
                    </td>
                    <td>
                      <p>{event.location}</p>
                    </td>
                    <td>
                      <p>{newdate(event.date_created).toLocaleDateString(
                        "en-US",
                        options_date
                      )}</p>
                    </td>
                    <td>
                      <p>{event.count}</p>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
         <AddFamily/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default emr;
