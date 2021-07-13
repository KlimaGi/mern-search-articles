import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

class Time extends Component {
  constructor(props) {
    super(props);

    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback(start, end, label) {
    const startTime = start._d.toISOString().split(".")[0] + "Z";
    const endTime = end._d.toISOString().split(".")[0] + "Z";

    console.log(start._d.toISOString().split(".")[0] + "Z");
    console.log(end._d.toISOString().split(".")[0] + "Z");

    this.props.onSetTime(startTime, endTime);
  }

  render() {
    return (
      <DateRangePicker
        initialSettings={{ startDate: "1/1/2021", endDate: "3/1/2021" }}
        onEvent={this.handleEvent}
        onCallback={this.handleCallback}
      >
        <button type="button" className="btn btn-outline-light">
          click to open
        </button>
      </DateRangePicker>
    );
  }
}
export default Time;
