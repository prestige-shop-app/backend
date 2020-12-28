const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", require("./Routers/Users.js"));
app.use("/drivers", require("./Routers/Drivers.js"));
app.use("/requests", require("./Routers/Requests.js"));
app.use("/validations", require("./Routers/Validations.js"));


app.use(express.static(path.join(__dirname, "../build"))); 


const port = 3000;
app.listen(port, () => {
  console.log(`listening at port at http://localhost:${port}`);
});
