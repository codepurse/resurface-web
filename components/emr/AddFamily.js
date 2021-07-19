import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
import moment from "moment";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appglobal from "../../services/api.service";

function AddFamily({handleClose}) {
  const [locations,setLocations] = useState([])
  const [locationId,setLocationId] = useState(null)
  const [editable,setEditable] = useState(false)

  // Get location
  useEffect(()=>{
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: appglobal.api.base_api + appglobal.api.get_all_location,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        //handle success
        setLocations(response.data.data)
      })
      .catch(function (response) {
        console.log("Get All User", response);
      });

  },[])

  // Submit Location
  const handleSubmit = (values) => {


      const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("location_id", locationId.value);
        formData.append("family_name", values.family_name);
      if(editable !== true){
        // handle Add Family
        axios({
          method: "post",
          url: appglobal.api.base_api + appglobal.api.add_family,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
          .then(function (response) {
            //handle success
            console.log(response);
            handleClose();
          })
          .catch(function (response) {
            //handle error
            console.log(response.response);
          });


      }else{
        // Handle Edit Family
        formData.append("_method", "PUT");
        axios({
          method: "post",
          url: appglobal.api.base_api + appglobal.api.update_event + calendarlist.id,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
          .then(function (response) {
            //handle success
            console.log(response);
            setTrigger(!trigger);
            handleClose();
          })
          .catch(function (response) {
            //handle error
            console.log(response.response);
          });
      }
    
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F7F8FA",
      color: "#212121",
      border: "2px solid #EEEEEE",
      boxShadow: "none",
      borderRadius: "5px",
      width: "100%",
      padding: "1px",
      marginTop: "5px",
      fontFamily: "Roboto",
      boxShadow: state.isFocused ? "#003171" : null,
      "&:hover": {
        borderColor: state.isFocused ? "#003171" : "",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#212121",
    }),
  };

  return (
    <Formik
      enableReinitialize = {true}
      initialValues={{
        family_name: "",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object({
        family_name: yup
          .string()

          .required("Please Enter Family Name"),
      })}
      onSubmit={(values) => {
        // alert(JSON.stringify(values));
        handleSubmit(values);
      }}
    >
        <>
          <p className="pModalheader">Add Family</p>
          <p className="pModalheadersub">
            This section contains all basic details of your Family.
          </p>
          <Container className="modal-details">
            <Form>
              <Row>
                <Col lg={12}>
                  <p className="pModalheadertext">Family Name</p>
                  <Field
                    name="family_name"
                    type="text"
                    className="txtInput"
                  ></Field>
                  <div className="text-danger">
                    <ErrorMessage name="family_name"></ErrorMessage>
                  </div>
                </Col>
                <Col lg={12}>
                  <p className="pModalheadertext">Location</p>
                  <Select
                    defaultValue={{ value: locations.id, label: locations.city}}
                    options={locations.map((locations)=>({value: locations.id, label: locations.city}))}
                    styles={customStyles}
                    onChange={(e) => {
                      setLocationId(e);
                    }}
                  />
                </Col>
               
                <Col lg={12}>
                  <div className="form-inline float-right">
                    <button
                    type="button"
                      onClick={() => {
                        handleClose();
                      }}
                      className="btnCancelEvent"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btnSaveEvent">
                      Save
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Container>
        </>
    </Formik>
  );
}

export default AddFamily;
