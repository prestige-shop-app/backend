const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('../dist'))
// Routes 

// Server listening
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`listening at port at http://localhost:${PORT}`);
});