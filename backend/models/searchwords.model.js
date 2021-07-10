const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const searchWordSchema = new Schema(
  {
    searchWord: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const SearchWord = mongoose.model("SearchWord", searchWordSchema);

module.exports = SearchWord;
