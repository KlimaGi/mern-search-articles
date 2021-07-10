const router = require("express").Router();
let SearchWord = require("../models/searchwords.model");

//get list of words
router.route("/").get((req, res) => {
  SearchWord.find()
    .then((searchwords) => res.json(searchwords))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const searchword = req.body.searchword;

  const newSearchWord = new SearchWord({ searchword });

  newSearchWord
    .save()
    .then(() => res.json("Word added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
