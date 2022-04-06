import React from "react";
import axios from "axios";
import moment from "moment";
import "font-awesome/css/font-awesome.min.css";
import { Header } from "./Header";
import { ArticlesList } from "./ArticlesList";
import { SearchContext } from "../context/searchContext";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      articlesFromGNews: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(searchword, searchIn, language, fromTime, toTime) {
    this.setState({
      searchWord: searchword,
    });
    // send search word to mongoDB
    const word = {
      searchword: searchword,
    };
    axios
      .post("http://localhost:5000/searchwords/add", word)
      .then((response) => console.log(response.data));

    // get gNews articles by searchword
    const search = searchword || "news";
    const searchWhere = searchIn || "content";
    const lang = language || "en";
    const from = fromTime;
    const to = toTime;
    const token = process.env.REACT_APP_GN_TOKEN;
    fetch(
      `https://gnews.io/api/v4/search?q=${search}&in=${searchWhere}&lang=${lang}&from=${from}&to=${to}&max=9&token=${token}`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
      });
  }

  render() {
    const searchContextValue = {
      articlesFromGNews: this.state.articlesFromGNews,
      handleSearch: this.handleSearch,
    };
    return (
      <SearchContext.Provider value={searchContextValue}>
        <div className="container-fluid g-0">
          <Header />
          <div className="px-5">
            <ArticlesList />
          </div>
        </div>
      </SearchContext.Provider>
    );
  }
}
