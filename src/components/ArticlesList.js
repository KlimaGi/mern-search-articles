import React, { Component } from "react";
import Article from "./Article";

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesFromGNews: [],
      articleTitlesFromMongo: [],
    };

    this.articleList = this.articleList.bind(this);
  }

  articleList = (prop) => {
    return prop.map((details, index) => {
      return (
        <Article
          title={details.title}
          image={details.image}
          description={details.description}
          url={details.url}
          time={details.publishedAt}
          key={index}
        />
      );
    });
  };

  render() {
    return (
      <div className="row">{this.articleList(this.props.articlesData)}</div>
    );
  }
}
