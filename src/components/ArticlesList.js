import React, { useState, useEffect } from "react";
import axios from "axios";
import { Article } from "./Article";
import { Spinner } from "./common/Spinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { SearchContext } from "../context/searchContext";

export const ArticlesList = () => {
  const [articleTitlesFromMongo, setArticleTitlesFromMongo] = useState([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // get titles from mongoDB
    axios.get("http://localhost:5000/articles").then((response) => {
      if (response.data.length > 0) {
        const arrTitles = [];
        response.data.map((object) => arrTitles.push(object.title));
        setArticleTitlesFromMongo(arrTitles);
      }
    });
  }, []);
  const checkVisited = (title) => {
    const isTile = articleTitlesFromMongo.includes(title);
    console.log(["isTitle", isTile]);
    return isTile;
  };

  const articleList = (list) => {
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
    } else {
      setTimeout(() => {
        setShowError(false);
      }, 6000);
      return <div>{showError ? <ErrorMessage /> : <Spinner />}</div>;
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
