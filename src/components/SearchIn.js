import React from "react";

export class SearchIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchIn: [{ key: "Title" }, { key: "Description" }, { key: "Content" }],
    };
    this.onClickSearchIn = this.onClickSearchIn.bind(this);
  }

  onClickSearchIn = (event) => {
    const chosenName = this.state.searchIn.filter((el) => {
      if (event.target.value === el.key) {
        // console.log("searchIn.name", el.key);
        return el.key;
      }
    });

    this.props.onClickSearchInSet(chosenName[0].key.toLowerCase());
    console.log("chosenName", chosenName[0].key.toLowerCase());
  };
  render() {
    return (
      <div>
        <select
          className="form-select text-color mx-2 input-back"
          onChange={this.onClickSearchIn}
        >
          <option className="text-color">Choose search in </option>
          {this.state.searchIn.map((choosen) => {
            return <option key={choosen.key}>{choosen.key}</option>;
          })}
        </select>
      </div>
    );
  }
}
