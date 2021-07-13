import React, { Component } from "react";
import axios from "axios";

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };

    this.writeToDB = this.writeToDB.bind(this);
  }
  componentDidMount() {
    this.setState({ title: this.props.title });
  }

  writeToDB = () => {
    const articleTitle = {
      title: this.state.title,
    };

    console.log(articleTitle);
    // TODO: if word unique, add to data base
    // send search word to mongoDB
    axios
      .post("http://localhost:5000/articles/add", articleTitle)
      .then((res) => console.log(res.data));

    console.log(this.state.title);

    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <a
          href={this.props.linkTo}
          target="_blank"
          onClick={this.writeToDB}
          className="btn"
        >
          Read Article
        </a>
      </div>
    );
  }
}
