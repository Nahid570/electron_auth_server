const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.cpassword = await bcrypt.hash(this.cpassword, salt);
});

userSchema.methods.validatePassword = async function (enteredpass) {
  return await bcrypt.compare(enteredpass, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
