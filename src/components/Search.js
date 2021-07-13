import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      filteredSearchWordsFromDB: [],
      selectedWord: "",
      searchWordsFromDB: [],
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/searchwords")
      .then((res) => {
        const arr2 = [];
        res.data.map((name) => arr2.push(name.searchword));
        this.setState({ searchWordsFromDB: arr2 });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state.searchWordsFromDB);
  }

  handleFocus() {
    this.setState({
      selectedWord: "",
    });
    console.log(this.state.searchWordsFromDB);
  }

  handleChange(event) {
    this.props.onSendWord(event.target.value);
    const word = event.target.value;

    if (
      word.length >= 2 &&
      word.length <= 40 &&
      word.match(/^[a-zA-Z0-9 ]*$/gi)
    ) {
      const filteredSearchWordsFromDB = this.state.searchWordsFromDB.filter(
        (el) => {
          if (el.indexOf(event.target.value) !== -1) {
            return el;
          }
        }
      );
      this.setState({
        filteredSearchWordsFromDB: filteredSearchWordsFromDB,
        error: false,
      });

      this.setState({
        showResults: true,
      });
    } else {
      this.setState({
        showResults: false,
        error: true,
      });
    }
  }

  selectWord(word) {
    this.setState({
      selectedWord: word,
      showResults: false,
      filteredSearchWordsFromDB: [],
    });
    this.props.onSendWord(word);
  }

  render() {
    return (
      <div className="">
        <input
          type="text"
          className="form-control input-back text-color"
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder="Enter search word"
        />
        {this.state.error && (
          <div className="error">
            <p className="text-danger p-1 m-0">
              Ups... please enter valid word
            </p>
          </div>
        )}
        {this.state.showResults && (
          <ul className="search-list-box rounded">
            {this.state.filteredSearchWordsFromDB.map((word, index) => (
              <WordsList
                searchWord={word}
                onClickWord={this.selectWord}
                indexKey={index}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

function WordsList(props) {
  return (
    <li
      key={props.indexKey}
      className="li-item px-3 py-1 "
      onClick={() => {
        props.onClickWord(props.searchWord);
      }}
    >
      {props.searchWord}
    </li>
  );
}

export default Search;
