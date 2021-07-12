import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

class App extends Component {
  state = {
    events: [
      {
        title: "My event 1",
        allDay: false,
        start: new Date(2020, 6, 6, 10, 0), // 10.00 AM
        end: new Date(2020, 8, 6, 13, 0), // 2.00 PM
        col: "#ee3559",
      },
      {
        title: "My event 2",
        allDay: false,
        start: new Date(2020, 7, 6, 13, 0), // 10.00 AM
        end: new Date(2020, 10, 6, 15, 0), // 2.00 PM6
        col: "#ee3559",
      },
    ],
    viewState: "month",
  };

  getCustomToolbar = (toolbar) => {
    this.toolbarDate = toolbar.date;
    const goToDayView = () => {
      toolbar.onView("day");
      this.setState({ viewState: "day" });
    };
    const goToWeekView = () => {
      toolbar.onView("week");
      this.setState({ viewState: "week" });
    };
    const goToMonthView = () => {
      toolbar.onView("month");
      this.setState({ viewState: "month" });
    };
    const goToBack = () => {
      let view = this.state.viewState;
      let mDate = toolbar.date;
      let newDate;
      if (view === "month") {
        newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
      } else if (view === "week") {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() - 7,
          1
        );
      } else {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() - 1,
          1
        );
      }
      toolbar.onNavigate("prev", newDate);
    };
    const goToNext = () => {
      let view = this.state.viewState;
      let mDate = toolbar.date;
      let newDate;
      if (view === "month") {
        newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
      } else if (view === "week") {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() + 7,
          1
        );
      } else {
        newDate = new Date(
          mDate.getFullYear(),
          mDate.getMonth(),
          mDate.getDate() + 1,
          1
        );
      }
      toolbar.onNavigate("next", newDate);
    };

    const goToToday = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate("current");
    };

    const goToBackYear = () => {
      let mDate = toolbar.date;
      let newDate = new Date(mDate.getFullYear() - 1, 1);
      toolbar.onNavigate("prev", newDate);
    };

    const goToNextYear = () => {
      let mDate = toolbar.date;
      let newDate = new Date(mDate.getFullYear() + 1, 1);
      toolbar.onNavigate("next", newDate);
    };

    const month = () => {
      const date = moment(toolbar.date);
      let month = date.format("MMMM");

      return <span className="rbc-toolbar-label">{month}</span>;
    };
    const year = () => {
      const date = moment(toolbar.date);
      let year = date.format("YYYY");

      return (
        <span className="rbc-btn-group">
          {this.state.viewState === "month" && (
            <button type="button" onClick={goToBackYear}>
              <span className="prev-icon">&#8249;&#8249;</span>
            </button>
          )}
          <span className="rbc-toolbar-label">{year}</span>
          {this.state.viewState === "month" && (
            <button type="button" onClick={goToNextYear}>
              <span className="prev-icon">&#8250;&#8250;</span>
            </button>
          )}
        </span>
      );
    };

    const day = () => {
      let view = this.state.viewState;
      const date = moment(toolbar.date);
      let day;
      if (view === "day") {
        day = date.format("ddd") + " " + date.format("Do");
      }
      return <span className="rbc-toolbar-label">{day}</span>;
    };

    return (
      <div className="rbc-toolbar">
        {month()}
        {year()}
        {day()}
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}>
            <span className="prev-icon">&#8249;</span>
          </button>
          <button type="button" onClick={goToToday}>
            <span className="next-icon">Today</span>
          </button>
          <button type="button" onClick={goToNext}>
            <span className="next-icon">&#8250;</span>
          </button>
        </span>
        <span className="rbc-btn-group">
          <button className="" onClick={goToMonthView}>
            <span className="label-filter-off">Month</span>
          </button>
          <button className="rbc-active" onClick={goToDayView}>
            <span className="label-filter-off">Day</span>
          </button>
          <button className="" onClick={goToWeekView}>
            <span className="label-filter-off">Week</span>
          </button>
        </span>
      </div>
    );
  };
  render() {
    const localizer = momentLocalizer(moment); // or globalizeLocalizer
    return (
      <Calendar
        localizer={localizer}
        selectable
        events={this.state.events}
        components={{
          toolbar: this.getCustomToolbar,
        }}
      />
    );
  }
}

export default App;
