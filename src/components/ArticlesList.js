import React, { Component } from "react";
import Article from "./Article";
import axios from "axios";

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleTitlesFromMongo: [],
    };

    this.articleList = this.articleList.bind(this);
  }

  componentDidMount() {
    // get titles from mongoDB
    axios.get("http://localhost:5000/articles").then((response) => {
      if (response.data.length > 0) {
        const arrTitles = [];
        response.data.map((el) => arrTitles.push(el.title));
        this.setState({ articleTitlesFromMongo: arrTitles });
        console.log(
          "articleTitlesFromMongo",
          this.state.articleTitlesFromMongo
        );
      }
    });
  }

  checkVisited(title) {
    return this.state.articleTitlesFromMongo.includes(title) ? true : false;
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
          visited={this.checkVisited(details.title)}
        />
      );
    });
  };

  render() {
    return (
      <div className="d-flex flex-wrap justify-content-evenly my-3">
        {this.articleList(this.props.articlesData)}
      </div>
    );
  }
}
