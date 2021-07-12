import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };

    this.onChangeDate = this.onChangeDate.bind(this);
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
    console.log(
      "date",
      new Date(this.state.date).toISOString().split(".")[0] + "Z"
    );
    this.props.onSetTime(this.state.date);
  }
  render() {
    return (
      <div className="form-group px-3 ">
        <DatePicker
          className="date-style rounded"
          selected={this.state.date}
          onChange={this.onChangeDate}
        />
      </div>
    );
  }
}
export default Time;
