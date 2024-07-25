const pool = require("../db");
const { getTimeStamp } = require("../util/dateTime");
const {
  sendSuccessResponse,
  sendErrorResponse,
  renderView,
} = require("../util/responseHandler");

// Delete a note
const deleteNote = (req, res) => {
  const noteId = req.params.id;
  const sql = "DELETE FROM notestable WHERE id = ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      sendErrorResponse(res, "Server error");
      return;
    }

    connection.query(sql, [noteId], (err, results) => {
      connection.release();

      if (err) {
        console.error("Error deleting note from database:", err);
        sendErrorResponse(res, "Server error");
        return;
      }

      if (results.affectedRows === 0) {
        sendErrorResponse(res, "Note not found", 404);
      } else {
        sendSuccessResponse(res, { message: "Note deleted successfully" });
      }
    });
  });
};

// Get a single note's details
const noteDetails = (req, res) => {
  const noteId = req.params.id;
  const sql = "SELECT * FROM notestable WHERE id = ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      sendErrorResponse(res, "Server error");
      return;
    }

    connection.query(sql, [noteId], (err, results) => {
      connection.release();

      if (err) {
        console.error("Error fetching note from database:", err);
        sendErrorResponse(res, "Server error");
        return;
      }

      const note = results[0];
      if (!note) {
        renderView(res, "404.ejs");
      } else {
        renderView(res, "noteDetails.ejs", { note });
      }
    });
  });
};

// Edit a note
const noteEdit = (req, res) => {
  const { title, note } = req.body;
  const noteId = req.params.id;
  const timeStamp = getTimeStamp();
  const sql =
    "UPDATE notestable SET title = ?, note = ?, timeStamp = ? WHERE id = ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      sendErrorResponse(res, "Server error");
      return;
    }

    connection.query(sql, [title, note, timeStamp, noteId], (err, results) => {
      connection.release();

      if (err) {
        console.error("Error executing query:", err);
        sendErrorResponse(res, "Server error");
        return;
      }

      res.redirect("/notes");
    });
  });
};

// Add a new note
const addNote = (req, res) => {
  const { title, note } = req.body;
  const timeStamp = getTimeStamp();
  const sql =
    "INSERT INTO notestable (title, note, timeStamp) VALUES (?, ?, ?)";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      sendErrorResponse(res, "Server error");
      return;
    }

    connection.query(sql, [title, note, timeStamp], (err, results) => {
      connection.release();

      if (err) {
        console.error("Error executing query:", err);
        sendErrorResponse(res, "Server error");
        return;
      }

      res.redirect("/notes");
    });
  });
};

// Get all notes
const getAllNotes = (req, res) => {
  const sql = "SELECT * FROM notestable";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      sendErrorResponse(res, "Server error");
      return;
    }

    connection.query(sql, (err, results) => {
      connection.release();

      if (err) {
        console.error("Error executing query:", err);
        sendErrorResponse(res, "Server error");
        return;
      }

      renderView(res, "notes.ejs", { results });
    });
  });
};

module.exports = { deleteNote, noteDetails, noteEdit, addNote, getAllNotes };
