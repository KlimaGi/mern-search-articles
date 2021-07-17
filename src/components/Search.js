import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResultsUl: false,
      filteredSearchWordsFromDB: [],
      searchWordsFromDB: [],
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {}

  handleFocus = () => {
    this.props.onSendWord("");
    this.setState({ filteredSearchWordsFromDB: [] });
    axios
      .get("http://localhost:5000/searchwords")
      .then((res) => {
        const arr2 = [];
        res.data.map((name) => arr2.push(name.searchword));
        this.setState({ searchWordsFromDB: arr2 });
        console.log("handleFocus", this.state.searchWordsFromDB);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange(event) {
    this.setState({ filteredSearchWordsFromDB: [] });
    console.log("this.state.searchWordsFromDB", this.state.searchWordsFromDB);
    this.props.onSendWord(event.target.value);

    const word = event.target.value;

    if (word === "") {
      this.setState({ error: false, showResultsUl: false });
    } else if (
      word.length >= 1 &&
      word.length <= 40 &&
      word.match(/^[a-zA-Z0-9 ]*$/gi)
    ) {
      console.log(word);
      console.log(this.state.searchWordsFromDB);
      const filteredSearchWordsFromDB = this.state.searchWordsFromDB.filter(
        (el) => {
          if (el.indexOf(word) !== -1) {
            return el;
          }
        }
      );
      console.log(
        "this.state.filteredSearchWordsFromDB",
        this.state.filteredSearchWordsFromDB
      );
      this.setState({
        filteredSearchWordsFromDB: filteredSearchWordsFromDB,
        error: false,
        showResultsUl: true,
      });
    } else {
      this.setState({
        showResultsUl: false,
        error: true,
      });
    }
  }

  selectWord(word) {
    this.setState({
      filteredSearchWordsFromDB: [],
    });
    this.props.onSendWord(word);
  }

  handleBlur = () => {
    this.setState({ showResultsUl: false });
  };

  render() {
    return (
      <div className="" onClick={this.handleBlur}>
        <div className="error-box error">
          {this.state.error && (
            <p className="error text-danger pb-1 m-0">
              Oops... please enter valid word
            </p>
          )}
        </div>

        <input
          type="text"
          className="form-control input-back text-color"
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          //onBlur={this.handleBlur}
          placeholder="Enter search word"
        />

        {this.state.showResultsUl && (
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
