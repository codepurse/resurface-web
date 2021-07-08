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
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function newdate(datetable) {
    var new_date = new Date(datetable);
    return new_date;
  }

  const fileType = (value) => {
    switch (value) {
      case "folder":
        return "../Image/icon/folder_colored.png";
      case "jpg":
        return "../Image/icon/jpg.png";
      case "docx":
        return "../Image/icon/doc.png";
    }
  };

  return (
    <>
      <Row>
        <Col lg={6}>
          <p>Documents</p>
          <p>
            All Documents relating to the app are stored here.You will find
            updated documents or create one.{" "}
          </p>
        </Col>
        <Col lg={6}>
          <div className="form-inline float-right">
            <input
              type="text"
              className="txtSearch"
              placeholder="Search .."
            ></input>
            <button className="btnCreateDocu">Create document</button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Table className="tableDocu" responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Type</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {documents_files.map((event) => (
                <tr>
                  <td>
                    <p className="pItemName">
                      <img className="img-fluid" src={fileType(event.type)} />
                      {event.name}
                    </p>
                  </td>
                  <td>
                    <p>
                      {newdate(event.date_created).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </p>
                  </td>
                  <td>
                    <p>
                      {newdate(event.date_update).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </p>
                  </td>
                  <td><p>{event.type}</p></td>
                  <td>
                    <p className="pSize">{event.size}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default table;
