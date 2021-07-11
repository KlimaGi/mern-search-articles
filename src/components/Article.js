import React from "react";
import ButtonList from "./ButtonLink";

const Article = (props) => (
  <div className="col-lg-4 col-md-6 col-sm-12 p-5 border-line">
    <div className="">
      <img src={props.image} className="articles-list" />
    </div>
    <h3>{props.title}</h3>
    <div className="truncate">
      <p>{props.description}</p>
    </div>

    <p>{props.time}</p>
    <p>{new Date(new Date() - 14400 * 1000).toISOString()}</p>

    <ButtonList title={props.title} linkTo={props.url} />
  </div>
);

export default Article;
