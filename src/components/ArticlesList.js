import React, { useState, useEffect } from "react";
import axios from "axios";
import { Article } from "./Article";
import { ErrorMessage } from "./common/ErrorMessage";
import { SearchContext } from "../context/searchContext";

export const ArticlesList = () => {
  const [articleTitlesFromMongo, setArticleTitlesFromMongo] = useState([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // get titles from mongoDB
    const getTitles = () => {
      axios.get("http://localhost:5000/articles").then((response) => {
        if (response.data.length > 0) {
          const arrTitles = [];
          response.data.map((object) => arrTitles.push(object.title));
          setArticleTitlesFromMongo(arrTitles);
        } else {
          console.log("error from articleList");
          setShowError(true);
        }
      });
    };
    getTitles();
    setShowError(showError);
  }, [showError]);

  const checkVisited = (title) => {
    const isTitle = articleTitlesFromMongo.includes(title);
    return isTitle;
  };

  const articleList = (list) => {
    if (!list) return <ErrorMessage text={"Woops! Something went wrong..."} />;
    if (list.length > 0) {
      return list.map((details, index) => {
        return (
          <Article
            title={details.title}
            image={details.image}
            description={details.description}
            url={details.url}
            key={index}
            visited={checkVisited(details.title)}
          />
        );
      });
    }
  };

  return (
    <SearchContext.Consumer>
      {({ articlesFromGNews }) => (
        <div className="d-flex flex-wrap justify-content-evenly my-3">
          {articleList(articlesFromGNews)}
        </div>
      )}
    </SearchContext.Consumer>
  );
};
