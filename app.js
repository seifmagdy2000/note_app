require("dotenv").config();
const express = require("express");
const notesRouter = require("./routes/notes.js");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/notes", notesRouter);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("404.ejs");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
