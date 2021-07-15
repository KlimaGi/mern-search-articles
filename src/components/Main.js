import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import ArticlesList from "./ArticlesList";
import Search from "./Search";
import Language from "./Language";
import Time from "./Time";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSearchWord = this.onChangeSearchWord.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      searchword: "",
      searchwords: [],
      articlesFromGNews: [],
      language: "",
      from: "",
      to: "",
      showUl: true,
    };
  }

  componentDidMount() {
    // get articles from gNews, 24h old
    const time =
      new Date(new Date() - 24 * 3600 * 1000).toISOString().split(".")[0] + "Z";

    fetch(
      `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=34db469be0d798ab5d942cde3f50538e

`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
        console.log("search input 9 data", data.articles);
      });
  }

  handleClick() {
    this.setState({
      searchword: "",
    });
  }

  onChangeSearchWord(e) {
    this.setState({
      searchword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const word = {
      searchword: this.state.searchword,
    };

    this.setState({
      showUl: false,
    });

    // send search word to mongoDB
    axios
      .post("http://localhost:5000/searchwords/add", word)
      .then((res) => console.log(res.data));

    // get gNews articles by searchword
    const search = this.state.searchword || "news";
    const lang = this.state.language || "en";
    const from = this.state.from;
    const to = this.state.to;

    fetch(
      `https://gnews.io/api/v4/search?q=${search}&in=content&lang=${lang}&from=${from}&to=${to}&max=9&token=34db469be0d798ab5d942cde3f50538e`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
        console.log(data.articles);
      });
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-end flex-wrap justify-content-start  back-color-style px-5 bt-3 pb-4">
          <div className="mx-5 ">
            <h2 className="text-white m-0">Articles from GNews</h2>
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="d-flex align-items-end flex-wrap justify-content-center">
              <div className="m-1 ">
                <Search
                  onSendWord={(inputWord) =>
                    this.setState({ searchword: inputWord })
                  }
                  value={this.state.searchword}
                  showUl={this.state.showUl}
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
