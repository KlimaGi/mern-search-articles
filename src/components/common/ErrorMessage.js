import React from "react";

export const ErrorMessage = ({ text }) => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="search-error-msg d-flex justify-content-center align-items-center m-5">
      <p className="text-center m-5">{text}</p>
      <button
        onClick={handleClick}
        className="m-5 text-color btn btn-outline-light button-style "
      >
        Try again
      </button>
    </div>
  );
};
