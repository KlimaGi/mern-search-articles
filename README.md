Load backend: cd backend; nodemon server. Frontend: yarn start.

REACT_APP_GN_TOKEN is token from gNews, it is used in src/components/Main.js.
ATLAS_URI is key from mongoDB, it is used in backend/server.js.

Source of the spinner (loading style) is https://codepen.io/jackrugile/pen/JddmaX

A search component has been created that allows the user to see 9 articles according to the selected criteria. The search component communicates with
article search API.

In the search boxes, the user can: enter text; choose search engines
area (in title, summary or text); choose a language; choose a time
frames. The user receives articles based on selected or unselected criteria
links. User-read articles are marked.

This project uses information obtained dynamically from articles
Receipt API:
`https://gnews.io/api/v4/search?q=${search}&in=${searchWhere}&lang=${lang}&from=${from}&to=${to}&max=9&token=${token} `
The titles of the read articles are stored in the mongoDB database. This is
accessible by reading marking articles.
Unique search terms are also stored in mongoDB. This is a list of similar
words, when a user enters a search word.

\_to_do:

1. Save search criteria when directed to the window of the selected article.
2. Adjust the style for different screen settings.
3. Adjust style at hover, select, hover date picker.
4. Repair the node.js files for more clean code.
5. Apply error boundary.
