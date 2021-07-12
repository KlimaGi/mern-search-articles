import React from "react";
import ButtonList from "./ButtonLink";

const Article = (props) => (
  <div className=" col-lg-4 col-md-6 col-sm-12 border-line">
    <div className="m-5 article-box">
      <img src={props.image} className="img-style" />
      <div className="m-3">
        <h5 className="">{props.title}</h5>

        <p className="d-inline-block text-truncate for-truncate-width">
          {props.description}
        </p>
      </div>

      <div className="bottom container-fluid rounded-0 back-color-style">
        <ButtonList title={props.title} linkTo={props.url} />
      </div>
    </div>
  </div>
);

export default Article;
