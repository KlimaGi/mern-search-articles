import dotenv from "dotenv";
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import ArticlesList from "./ArticlesList";
import Search from "./Search";
import Language from "./Language";
import Time from "./Time";
import moment from "moment";
require("dotenv").config();

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      searchWord: "",
      articlesFromGNews: [],
      language: "",
      from: "",
      to: "",
    };
  }

  componentDidMount() {
    // get articles from gNews, 24h old
    const time = moment().subtract(2, "days").toISOString().split(".")[0] + "Z";
    const token = process.env.REACT_APP_GN_TOKEN;
    fetch(
      `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=${token}`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
      });
  }

  onSubmit(event) {
    event.preventDefault();

    // send search word to mongoDB
    const word = {
      searchword: this.state.searchWord,
    };
    axios
      .post("http://localhost:5000/searchwords/add", word)
      .then((response) => console.log(response.data));

    // get gNews articles by searchword
    const search = this.state.searchWord || "news";
    const lang = this.state.language || "en";
    const from = this.state.from;
    const to = this.state.to;
    const token = process.env.REACT_APP_GN_TOKEN;
    fetch(
      `https://gnews.io/api/v4/search?q=${search}&in=content&lang=${lang}&from=${from}&to=${to}&max=9&token=${token}`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
      });
  }

  render() {
    return (
      <div className="container-fluid g-0">
        <div className="d-flex align-items-end flex-wrap justify-content-start  back-color-style px-5 bt-3 pb-4">
          <div className="mx-5 ">
            <h2 className="text-white m-0">Articles from GNews</h2>
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="d-flex align-items-end flex-wrap justify-content-center">
              <div className="m-1 ">
                <Search
                  onSendWord={(inputWord) =>
                    this.setState({ searchWord: inputWord })
                  }
                  value={this.state.searchWord}
                />
              </div>
              <div className="m-1">
                <Language
                  onClickLanguage={(lang) => {
                    this.setState({ language: lang });
                  }}
                />
              </div>

              <div className="px-2 m-1">
                <Time
                  onSetTime={(from, to) => {
                    this.setState({ from, to });
                  }}
                />
              </div>
              <div className="m-1">
                <button
                  type="submit"
                  className="btn btn-outline-light d-inline button-style"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="px-5">
          <ArticlesList articlesData={this.state.articlesFromGNews} />
        </div>
      </div>
    );
  }
}
