import React from "react";

class SearchIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchIn: [
        { key: "Title", name: "title" },
        { key: "Description", name: "description" },
        { key: "Content", name: "content" },
      ],
    };
    this.onClickSearchIn = this.onClickSearchIn.bind(this);
  }

  onClickSearchIn = (event) => {
    const chosenName = this.state.searchIn.filter((el) => {
      if (event.target.value === el.key) {
        console.log("searchIn.name", el.name);
        return el.name;
      }
    });

    this.props.onClickSearchInSet(chosenName[0].name);
    console.log("chosenName", chosenName[0].name);
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
            return <option>{choosen.key}</option>;
          })}
        </select>
      </div>
    );
  }
}
export default SearchIn;