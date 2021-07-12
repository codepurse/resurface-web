import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import event from "../../services/events";
import toolbar from "react-big-calendar";

export default function App() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const [selectedView, setSelectedview] = useState("month");

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
      $(".btnweek").attr('style','color: blue !important');
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
                  className="btn btn-secondary"
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
                  className="btn btn-secondary"
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
        {event.title}
        <br />
        <span className="spanTime">{timeNow(event.start)} - {timeNow(event.end)}</span>
      </span>
    );
  };
  function timeNow(timestart) {
    return (
       new Date(timestart).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }
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
          localizer={localizer}
          events={event}
          view={selectedView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          components={{
            toolbar: customToolbar,
            event: EventT,
          }}
          onSelectEvent={(event) => {
            alert(event.title);
          }}
          tooltipAccessor={(event) => {
            return event.title + " " + event.start;
          }}
        />
      </Container>
    </>
  );
}
