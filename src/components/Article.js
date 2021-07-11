import React from "react";

const Article = (props) => (
  <div className="col-lg-4 col-md-6 col-sm-12 p-5 border-line">
    <div className="">
      <img src={props.image} className="articles-list" />
    </div>
    <h4>{props.title}</h4>
    <p>{props.description}</p>
    <p>{props.time}</p>
    <p>{new Date(new Date() - 14400 * 1000).toISOString()}</p>
    <a href={props.url} className="btn btn-secondary">
      Read article
    </a>
  </div>
);

export default Article;
