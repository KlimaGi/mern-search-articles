import React, { Component } from "react";

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = { DDl1: [], l: "" };

    this.onClickL = this.onClickL.bind(this);
  }

  componentDidMount() {
    this.setState({
      DDl1: [
        { key: "Arabic", name: "ar" },
        { key: "German", name: "de" },
        { key: "Greek", name: "el" },
        { key: "English", name: "en" },
        { key: "Spanish", name: "es" },
        { key: "French", name: "fr" },
        { key: "Hebrew", name: "he" },
        { key: "Hindi", name: "hi" },
        { key: "Italian", name: "it" },
        { key: "Japanese", name: "ja" },
        { key: "Malayalam", name: "ml" },
        { key: "Marathi", name: "mr" },
        { key: "Dutch", name: "nl" },
        { key: "Norwegian", name: "no" },
        { key: "Portuguese", name: "pt" },
        { key: "Romanian", name: "ro" },
        { key: "Russian", name: "ru" },
        { key: "Swedish", name: "sv" },
        { key: "Tamil", name: "ta" },
        { key: "Telugu", name: "te" },
        { key: "Ukrainian", name: "uk" },
        { key: "Chinese", name: "zh" },
      ],
    });
  }

  onClickL = (e) => {
    const langName = this.state.DDl1.filter((el) => {
      if (e.target.value == el.key) {
        return el.name;
      }
    });
    this.props.onClickLanguage(langName[0].name);
  };

  render() {
    return (
      <div>
        <select
          className="form-select text-color mx-2 input-back"
          onChange={this.onClickL}
        >
          <option className="text-color">Select Language</option>
          {this.state.DDl1.map((lang) => {
            return <option>{lang.key}</option>;
          })}
        </select>
      </div>
    );
  }
}

export default Language;
