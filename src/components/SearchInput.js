import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import ArticlesList from "./ArticlesList";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSearchWord = this.onChangeSearchWord.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      searchword: "",
      searchwords: [],
      articlesFromGNews: [],
    };
  }

  componentDidMount() {
    // get searchwords from mongoDB
    axios.get("http://localhost:5000/searchwords").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          searchwords: response.data.map((word) => word.searchword),
          searchword: "",
        });
      }
    });

    // get articles from gNews, 24h old
    const time =
      new Date(new Date() - 24 * 3600 * 1000).toISOString().split(".")[0] + "Z";
    console.log(time);
    fetch(
      `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=34db469be0d798ab5d942cde3f50538e`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
        console.log(data.articles);
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

    console.log(word);
    // TODO: if word unique, add to data base
    // send search word to mongoDB
    axios
      .post("http://localhost:5000/searchwords/add", word)
      .then((res) => console.log(res.data));

    // get gNews articles by searchword
    const search = this.state.searchword;

    fetch(
      `https://gnews.io/api/v4/search?q=${search}&in=content&lang=en&max=9&token=34db469be0d798ab5d942cde3f50538e`
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
        <div className="d-flex justify-content-start align-items-center back-color-style px-5 ">
          <div className=" mx-3 my-3">
            <h2 className="text-white m-0">Articles from GNews</h2>
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="d-flex justify-content-center mx-5 my-3">
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.searchword}
                  onChange={this.onChangeSearchWord}
                  onClick={this.handleClick}
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-light d-inline mx-2"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <ArticlesList articlesData={this.state.articlesFromGNews} />
      </div>
    );
  }
}
