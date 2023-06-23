const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const generateJWT_Token = require("../config/jwtToken");
const validatemongoId = require("../utils/validateMongoId");

exports.createUser = asyncHandler(async (req, res) => {
  const email = req?.body?.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    const { password, cpassword } = req?.body;
    if (password !== cpassword) {
      res.json({ message: "Password doesn't match" });
    } else {
      const newUser = await User.create(req.body);
      res.json(newUser);
    }
  } else {
    res.json({ message: "User already exists!", success: false });
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.validatePassword(password))) {
    res.json({
      _id: findUser._id,
      fullName: findUser.fullName,
      email: findUser.email,
      token: generateJWT_Token(findUser.id),
    });
  } else {
    throw new Error("Invalid credential");
  }
});

exports.createNote = asyncHandler(async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.json(newNote);
  } catch (error) {
    throw new Error(error);
  }
});

exports.allNotes = asyncHandler(async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    throw new Error("There is no notes");
  }
});

exports.updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validatemongoId(id);
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedNote);
  } catch (error) {
    throw new Error(error);
  }
});

exports.individualNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validatemongoId(id);
  try {
    const getNote = await Note.findById(id);
    res.json(getNote);
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validatemongoId(id);
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    res.json(deletedNote);
  } catch (error) {
    throw new Error(error);
  }
});
