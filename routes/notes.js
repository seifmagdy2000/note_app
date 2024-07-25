const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Route to add a note (render form)
router.get("/add", (req, res) => {
  res.status(200).render("addNote.ejs");
});

// Route to delete a note by id
router.delete("/delete/:id", noteController.deleteNote);

// Route to get a note by id
router.get("/:id", noteController.noteDetails);

router.post("/edit/:id", noteController.noteEdit);

// Route to add a new note (form submission)
router.post("/", noteController.addNote);

// Route to get all notes
router.get("/", noteController.getAllNotes);

module.exports = router;
