import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSearchWord = this.onChangeSearchWord.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      searchword: "",
      searchwords: [],
      showResults: false,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/searchwords").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          searchwords: response.data.map((word) => word.searchword),
          searchword: "",
        });
      }
    });
  }

  handleClick() {
    this.setState({
      showResults: true,
      searchword: "",
    });
  }

  handleSelect() {
    this.setState((word) => {
      return {
        searchword: word,
        showResults: false,
      };
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
    axios
      .post("http://localhost:5000/searchwords/add", word)
      .then((res) => console.log(res.data));

    this.setState({
      searchword: "",
    });
  }

  render() {
    return (
      <div className="px-5">
        <form onSubmit={this.onSubmit}>
          <div className="my-3">
            <div className="d-flex justify-content-center">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.searchword}
                  onChange={this.onChangeSearchWord}
                  onClick={this.handleClick}
                />
              </div>
              <div className="mx-2">
                <button type="submit" className="btn btn-secondary d-inline">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>

          {this.state.showResults && (
            <ul>
              {this.state.searchwords
                .map(function (searchword, index) {
                  return (
                    <li
                      onClick={this.handleSelect}
                      key={`${index}-${Date.now()}`}
                    >
                      {searchword}
                    </li>
                  );
                })
                .slice(0, 6)}
            </ul>
          )}
        </form>
      </div>
    );
  }
}
