import axios from "axios";

export const getTitlesFromDB = () => {
  axios
    .get("http://localhost:5000/articles")
    .then((response) => {
      if (response.data.length > 0) {
        const arrTitles = [];
        response.data.map((object) => arrTitles.push(object.title));
        return arrTitles;
      } else {
        return [];
      }
    })
    .catch((error) => console.log("error from titles"));
};
