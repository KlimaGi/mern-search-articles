const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articlesSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articlesSchema);

module.exports = Article;
