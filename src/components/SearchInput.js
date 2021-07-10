import React, { Component } from "react";
import axios from "axios";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSearchWord = this.onChangeSearchWord.bind(this);

    this.state = {
      searchword: "",
      searchwords: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/searchwords").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          searchwords: response.data.map((word) => word.searchword),
          searchword: response.data[0].searchword,
        });
      }
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
        <p>Search</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="form-group my-3">
              <label>Input search word</label>
              <input
                type="text"
                className="form-control"
                value={this.state.searchword}
                onChange={this.onChangeSearchWord}
              />
            </div>
            <ul>
              {this.state.searchwords.map(function (searchword, index) {
                return <li key={`${index}-${Date.now()}`}>{searchword}</li>;
              })}
            </ul>

            <div className="form-group">
              <input type="submit" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
