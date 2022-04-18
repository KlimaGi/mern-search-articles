import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "font-awesome/css/font-awesome.min.css";
import { Header } from "./Header";
import { ErrorMessage } from "./common/ErrorMessage";
import { Spinner } from "./common/Spinner";
import { ArticlesList } from "./ArticlesList";
import { SearchContext } from "../context/searchContext";

export const Main = () => {
  const [searchWord, setSearchWord] = useState("");
  const [articlesFromGNews, setArticlesFromGNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get articles from gNews, 24h old
    const time = moment().subtract(2, "days").toISOString().split(".")[0] + "Z";
    const token = process.env.REACT_APP_GN_TOKEN;
    const fetchData = () =>
      fetch(
        `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=${token}`
      )
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          setArticlesFromGNews(data.articles);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));

    fetchData();
  }, [searchWord, setArticlesFromGNews]);

  const handleSearch = (searchword, searchIn, language, fromTime, toTime) => {
    setSearchWord(searchword);

    // send search word to mongoDB
    axios
      .post("http://localhost:5000/searchwords/add", {
        searchword: searchword,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log("error", error));

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
        setArticlesFromGNews(data.articles);
        setLoading(false);
        if (data.articles.length < 1) setErrorMessage(true);
      })
      .catch((error) => {
        setErrorMessage(true);
      });
  };

  const searchContextValue = {
    articlesFromGNews,
    handleSearch,
  };
  return (
    <SearchContext.Provider value={searchContextValue}>
      <div className="container-fluid g-0">
        <Header />
        {loading && <Spinner />}
        {errorMessage && (
          <ErrorMessage text={"There is no results for your search word."} />
        )}
        <div className="px-5">
          <ArticlesList />
        </div>
      </div>
    </SearchContext.Provider>
  );
};
