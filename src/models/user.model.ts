import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requored: [true, "You must enter an username"],
    unique: true,
  },
  email: {
    type: String,
    requored: [true, "You must enter an email"],
    unique: true,
  },
  password: {
    type: String,
    requored: [true, "You must enter the password"],
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  fotgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
