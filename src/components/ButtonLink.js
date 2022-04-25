import React from "react";
import { writeToDB } from "../api-functions/api";

export const ButtonLink = ({ propTitle, linkTo }) => {
  const handleClick = () => {
    writeToDB(propTitle);

    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <a
        href={linkTo}
        target="_blank"
        onClick={handleClick}
        className="link-style"
        rel="noreferrer"
      >
        <div className="d-flex justify-content-center align-items-center p-2 buton-style">
          Read Article
        </div>
      </a>
    </div>
  );
};
