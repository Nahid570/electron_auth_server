const express = require("express");
const {
  createUser,
  loginUser,
  createNote,
  allNotes,
  updateNote,
  deleteNote,
  individualNote,
} = require("../controllers/userCtrl");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

// Note Routes
router.post("/create-note", createNote);
router.get("/all-notes", allNotes);
router.get("/:id", individualNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
