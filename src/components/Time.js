import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

export const Time = ({ onSetTime }) => {
  const handleCallback = (start, end) => {
    const startTime = start._d.toISOString().split(".")[0] + "Z";
    const endTime = end._d.toISOString().split(".")[0] + "Z";
    console.log(start._d.toISOString());
    onSetTime(startTime, endTime);
  };

  return (
    <DateRangePicker
      initialSettings={{
        startDate: moment().subtract(2, "days"),
        endDate: moment(),
      }}
      onCallback={handleCallback}
    >
      <button type="button" className="btn btn-outline-light mx-2 px-3">
        Select date
      </button>
    </DateRangePicker>
  );
};
