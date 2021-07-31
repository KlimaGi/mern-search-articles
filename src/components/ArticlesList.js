import React, { Component } from "react";
import Article from "./Article";
import axios from "axios";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleTitlesFromMongo: [],
      showError: false,
    };

    this.articleList = this.articleList.bind(this);
  }

  componentDidMount() {
    // get titles from mongoDB
    axios.get("http://localhost:5000/articles").then((response) => {
      if (response.data.length > 0) {
        const arrTitles = [];
        response.data.map((object) => arrTitles.push(object.title));
        this.setState({ articleTitlesFromMongo: arrTitles });
      }
    });
  }

  checkVisited(title) {
    return this.state.articleTitlesFromMongo.includes(title) ? true : false;
  }

  articleList = (prop) => {
    if (prop.length > 0) {
      return prop.map((details, index) => {
        return (
          <Article
            title={details.title}
            image={details.image}
            description={details.description}
            url={details.url}
            key={index}
            visited={this.checkVisited(details.title)}
          />
        );
      });
    } else {
      setTimeout(() => {
        this.setState({ showError: true });
      }, 6000);
      return <div>{this.state.showError ? <ErrorMessage /> : <Spinner />}</div>;
    }
  };

  render() {
    return (
      <div className="d-flex flex-wrap justify-content-evenly my-3">
        {this.articleList(this.props.articlesData)}
      </div>
    );
  }
}
