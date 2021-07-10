import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import ArticlesList from "./components/ArticlesList";
import Article from "./components/Article";

function App() {
  return (
    <Router>
      <div className="container-fluid g-0">
        <Header />
        <br />
        <SearchInput />
        <Route path="/" exact component={ArticlesList} />
        <Route path="article/:id" component={Article} />
      </div>
    </Router>
  );
}

export default App;
