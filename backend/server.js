require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose"); //

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const articlesRouter = require("./routes/articles");
const searchwordsRouter = require("./routes/searchwords");

app.use("/articles", articlesRouter);
app.use("/searchwords", searchwordsRouter);
//

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
