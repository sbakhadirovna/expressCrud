const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
