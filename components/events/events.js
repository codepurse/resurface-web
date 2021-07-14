import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Eventadd from "../dashboard/eventAdd";
import axios from "axios";
// import event from "../../services/events";
import appglobal from "../../services/api.service";

export default function App() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const [selectedView, setSelectedview] = useState("month");
  const [show, setShow] = useState(false);
  const [showEvent, setShowevent] = useState(false);
  const [trigger, setTrigger] = useState(true)
  const [editable,setEditable] = useState(false)
  const handleClose = () => setShow(false);
  const handleCloseEvent = () => setShowevent(false);
  const handleShow = () => setShow(true);
  const showAddevent = () => setShowevent(true);

  const [calendarlist, setCalendarlist] = useState([]);
  const [event, setEventlist] = useState([]);

  useEffect(() => {
    if (selectedView == "week") {
      $(".btnweek").attr(
        "style",
        "color: #003171 !important; font-weight: 600"
      );
    } else if (selectedView == "month") {
      $(".btnmonth").attr(
        "style",
        "color: #003171 !important; font-weight: 600"
      );
    } else {
      $(".btnday").attr("style", "color: #003171 !important; font-weight: 600");
    }
    console.log(event);
  });

  // Get All event
  const getEvents = async () => {
    const id = localStorage.getItem('id')
    const clinician_id = localStorage.getItem("clinician_id");
    await axios({
      method: "get",
      url: appglobal.api.base_api + appglobal.api.get_events + '?clinician_id=' + clinician_id,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setEventlist(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (response) {
        console.log(response.response);
      });
  };

  useEffect(() => {
    getEvents()
  }, [trigger])

  //  Delete Event
  const deleteEvent = async () => {
    const token = localStorage.getItem('token')
    axios({
      method: "delete",
      url: appglobal.api.base_api + appglobal.api.delete_event + calendarlist.id,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
        setTrigger(!trigger)
        handleClose()
      })
      .catch(function (response) {
        console.log("HandleDeleteUser", response)
        //handle error
      });


  }



  function customToolbar(toolbar) {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToDay = () => {
      toolbar.onNavigate("TODAY");
    };

    const goWeek = (e) => {
      setSelectedview("week");
    };

    const goMonth = () => {
      setSelectedview("month");
    };
    const goDay = () => {
      setSelectedview("day");
    };

    return (
      <Container fluid className="conToolbar">
        <Row>
          <Col lg={6}>
            <div className="form-inline">
              <p>
                <img src="Image/icon/calendar_blue.png" />
                {month} {date.getFullYear()}
              </p>
              <button onClick={goToBack}>
                <img src="Image/icon/arrow_left.png" />
              </button>
              <button onClick={goToNext}>
                <img src="Image/icon/arrow_right.png" />
              </button>
            </div>
          </Col>
          <Col lg={6}>
            <div className="float-right">
              <button className="btnNav" onClick={goToDay}>
                Today
              </button>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  onClick={goMonth}
                  className="btn btn-secondary btnmonth"
                >
                  Month
                </button>
                <button
                  type="button"
                  onClick={goWeek}
                  className="btn btn-secondary btnweek"
                >
                  Week
                </button>
                <button
                  type="button"
                  onClick={goDay}
                  className="btn btn-secondary btnday"
                >
                  Day
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  const EventT = ({ event }) => {
    return (
      <span>
        {event.subject}
        <br />
        <span className="spanTime">
          {timeNow(event.date_from)} - {timeNow(event.date_to)}
        </span>
      </span>
    );
  };
  function timeNow(timestart) {
    return new Date(timestart).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function showModal(eventdata) {
    setShow(true);
    setCalendarlist(eventdata);
  }

  const eventType = (value) => {
    switch (value) {
      case "Sessions":
        return "pSession";
      case "Business":
        return "pBusiness";
    }
  };

  const createEvent = ({ start, end }) => {
    setShowevent(true);
    setEditable(false)
  };

  const localizer = momentLocalizer(moment);
  return (
    <>
      <Row>
        <Col lg={6}>
          <p>Event Calendars</p>
          <p>
            In this section, you can view and manage all records with their
            details. You can view edit many information.
          </p>
        </Col>
        <Col lg={6}></Col>
      </Row>
      <Container fluid className="conCalendar">
        <Calendar
          selectable
          localizer={localizer}
          events={event}
          view={selectedView}
          startAccessor="date_from"
          endAccessor="date_to"
          style={{ height: 800 }}
          components={{
            toolbar: customToolbar,
            event: EventT,
          }}
          onSelectEvent={(event) => {
            showModal(event);
          }}
          tooltipAccessor={(event) => {
            return event.subject + " " + event.date_from;
          }}
          onSelectSlot={createEvent}
        />
        <Modal show={show} size="sm" onHide={handleClose} centered>
          <Modal.Body className="divModal">
            <Container>
              <Row>
                <Col lg={12}>
                  <p className="pHeader">{calendarlist.subject}</p>
                </Col>
              </Row>

              <Row className="row2nd">
                <Col lg={1}>
                  <img src="Image/icon/clock_events.png" />
                </Col>
                <Col lg={10}>
                  <p className="pTime">
                    {timeNow(calendarlist.date_from)} -{" "}
                    {timeNow(calendarlist.date_to)}
                  </p>
                  <p className="pDate">
                    {moment(calendarlist.date_from).format("dddd")}{" "}
                    {moment(calendarlist.date_from).format("MMMM")}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col lg={1}>
                  <img src="Image/icon/menu.png" />
                </Col>
                <Col lg={10}>
                  <p className="pDesc">{calendarlist.description}</p>
                </Col>
              </Row>
              <Row>
                <Col lg={1}>
                  <img src="Image/icon/event_type.png" />
                </Col>
                <Col lg={10}>
                  <p className={eventType(calendarlist.event_type)}>
                    {calendarlist.event_type}
                  </p>
                </Col>
              </Row>
              <Row className="rowMembers">
                <Col lg={12}>
                  <p>Members</p>
                  {(() => {
                    try {
                      return (
                        <>
                          <p className="pHost">
                            <img src="Image/icon/user.png"></img>{" "}
                            {calendarlist.clinicians.first_name}{" "}
                            {calendarlist.clinicians.last_name}
                          </p>
                          <p className="pHostsub">organizer</p>
                        </>
                      );
                    } catch (e) { }
                  })()}
                </Col>
                <Col lg={12}>
                  <button onClick={()=>{setEditable(true),setShowevent(true)}} >Edit</button>
                  <button onClick={() => { deleteEvent() }} >Delete</button>
                </Col>
                <Col lg={6}>

                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
        <Modal show={showEvent} onHide={handleCloseEvent} centered>
          <Modal.Body>
            <Eventadd
              handleClose={handleCloseEvent}
              trigger={trigger}
              setTrigger={setTrigger}
              editable = {editable}
              setEditable = {setEditable}
              calendarlist = {calendarlist}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
