import React from "react";
import axios from "axios";

export const ButtonLink = ({ propTitle, linkTo }) => {
  const writeToDB = () => {
    // send search word to mongoDB
    axios
      .post("http://localhost:5000/articles/add", { title: propTitle })
      .then((res) => console.log(res.data));

    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <a
        href={linkTo}
        target="_blank"
        onClick={writeToDB}
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
