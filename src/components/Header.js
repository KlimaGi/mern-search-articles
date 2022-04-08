import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Search } from "./Search";
import { SearchIn } from "./SearchIn";
import { Language } from "./Language";
import { Time } from "./Time";
import { SearchContext } from "../context/searchContext";

export const Header = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchIn, setSearchIn] = useState("");
  const [language, setLanguage] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <SearchContext.Consumer>
      {({ handleSearch }) => (
        <div className="d-flex align-items-end flex-wrap justify-content-start  back-color-style px-5 bt-3 pb-4">
          <div className="mx-5 ">
            <h2 className="text-white m-0">Articles from GNews</h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchWord, searchIn, language, from, to);
            }}
          >
            <div className="d-flex align-items-end flex-wrap justify-content-around">
              <div className="m-1 ">
                <Search
                  onSendWord={(inputWord) => setSearchWord(inputWord)}
                  value={searchWord}
                />
              </div>
              <div className="my-1 mx-2">
                <SearchIn
                  onClickSearchInSet={(item) => {
                    setSearchIn(item);
                  }}
                />
              </div>
              <div className="my-1 mx-2">
                <Language
                  onClickLanguage={(lang) => {
                    setLanguage(lang);
                  }}
                />
              </div>

              <div className="px-2 my-1 mx-0">
                <Time
                  onSetTime={(from, to) => {
                    setFrom(from);
                    setTo(to);
                  }}
                />
              </div>

              <div className="m-1">
                <button
                  type="submit"
                  className="btn btn-outline-light d-inline button-style"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </SearchContext.Consumer>
  );
};
