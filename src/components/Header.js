import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-5">
        <Link to="/" className="navbar-brand">
          Articles from GNews
        </Link>
      </nav>
    );
  }
}
