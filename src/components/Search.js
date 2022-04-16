import React, { useState } from "react";
import axios from "axios";

export const Search = ({ onSendWord, searchWord }) => {
  const [filteredSearchWordsFromDB, setFilteredSearchWordsFromDB] = useState(
    []
  );
  const [searchWordsFromDB, setSearchWordsFromDB] = useState([]);
  const [showResultsUl, setShowResultsUl] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleFocus = () => {
    onSendWord("");

    // get from mongoDB searchwords arr
    axios
      .get("http://localhost:5000/searchwords")
      .then((response) => {
        const tempArr = [];
        response.data.map((object) => tempArr.push(object.searchword));
        setSearchWordsFromDB(tempArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    onSendWord(event.target.value);

    const word = event.target.value;
    //console.log("input-word", word);
    if (!word) {
      setShowError(false);
      setShowResultsUl(false);
    } else if (
      word.length >= 3 &&
      word.length <= 40 &&
      word.match(/^[a-zA-Z0-9 ]*$/gi)
    ) {
      const filteredSearchWordsFromDB = searchWordsFromDB.filter(
        (wordFromDB) => wordFromDB.indexOf(word.toLowerCase()) !== -1
      );
      setFilteredSearchWordsFromDB(filteredSearchWordsFromDB);
      setShowError(false);
      setShowResultsUl(true);
    } else {
      setShowResultsUl(false);
      setShowError(true);
    }
  };

  const selectWord = (word) => {
    onSendWord(word);
  };

  const handleBlur = () => {
    setShowResultsUl(false);
  };

  return (
    <div className="parent-box" onClick={handleBlur}>
      <div className="error-box error">
        {showError && (
          <p className="error text-danger pb-1 m-0">
            Oops... please enter valid word
          </p>
        )}
      </div>

      <input
        type="text"
        className="form-control input-back text-color"
        value={searchWord}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder="Enter search word"
      />

      {showResultsUl && (
        <ul className="search-list-box px-3">
          {filteredSearchWordsFromDB.map((word, index) => (
            <WordsList
              searchWord={word}
              onClickWord={selectWord}
              indexKey={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const WordsList = ({ searchWord, onClickWord, indexKey }) => {
  return (
    <li
      key={indexKey}
      className="li-item py-2"
      onClick={() => {
        onClickWord(searchWord);
      }}
    >
      {searchWord}
    </li>
  );
};
