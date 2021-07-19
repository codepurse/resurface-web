import React, { Component, useState, useEffect, useRef, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import TimezoneSelect from "react-timezone-select";
/* Fake data */
import "../../services/api";

function emr() {
  const [show, setShow] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [startDate, setStartDate] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F7F8FA",
      color: "#212121",
      border: "2px solid #f5f5f5",
      boxShadow: "none",
      borderRadius: "8px",
      width: "100%",
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

  const options = useMemo(() => countryList().getData(), []);

  return (
    <>
      <Row>
        <Col lg={6}>
          <p>Location Directory</p>
          <p>
            In this section, you can view and manage all records with their
            details. You can view edit many information.
          </p>
        </Col>
        <Col lg={6}>
          <div className="form-inline float-right">
            <button onClick={handleShow}>Add Location</button>
          </div>
        </Col>
      </Row>
      <Container fluid className="conEmrtable">
        <Row>
          <Col lg={12}>
            <Table className="tableLocation" responsive borderless>
              <thead>
                <tr>
                  <th>City</th>
                  <th>State</th>
                  <th>State name</th>
                  <th>Country</th>
                  <th>Timezone</th>
                </tr>
              </thead>
              <tbody>
                {emr_list.map((event) => (
                  <tr>
                    <td>
                      <p></p>
                    </td>
                    <td>
                      <p></p>
                    </td>
                    <td>
                      <p></p>
                    </td>
                    <td>
                      <p></p>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal size="sm" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <p className="pModalheader">Create location</p>
          <p className="pModalheadersub">Fill up all the missing fields.</p>
          <Container className="modal-details">
            <Row>
              <Col lg={12}>
                <p className="pModalheadertext">City</p>
                <input type="text" className="txtInput"></input>
                <p className="pModalheadertext">State Id</p>
                <input type="text" className="txtInput"></input>
                <p className="pModalheadertext">State Name</p>
                <input type="text" className="txtInput"></input>
                <p className="pModalheadertext">Country</p>
                <Select options={options} styles={customStyles} />
                <p className="pModalheadertext">Time Zone</p>
                <TimezoneSelect
                  value={selectedTimezone}
                  onChange={setSelectedTimezone}
                  styles={customStyles}
                />
              </Col>
              <Col lg={6}>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                  }}
                  className="btnCancelLocation"
                >
                  Cancel
                </button>
              </Col>
              <Col lg={6}>
                <button type="submit" className="btnSaveLocation">
                  Save
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
