const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "This is not a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [isStrongPassword, "Password is too weak"],
  },
});

UserSchema.statics.register = async function (username, email, password) {
  const exist = await this.findOne({ username });
  const emailExist = await this.findOne({ email });
  if (exist) {
    console.log(exist._id);
    throw new Error("Username already in use");
  }
  if (emailExist) {
    throw new Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    email,
    password: hashed,
  });
  return user;
};
UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const matchingPass = await bcrypt.compare(password, user.password);
    if (matchingPass) {
      return user;
    }
    throw new Error("Password Incorrect");
  }
  throw new Error("User could not be found");
};

const BucketSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "No user associated with the Bucket item"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Item must have a title"],
    },
    description: {
      type: String,
    },
    steps: {
      type: [
        {
          step: {
            type: String,
            required: [true, "All steps must have a title"],
          },
          done: {
            type: Boolean,
            required: true,
            default: false,
          },
          finishedAt: {
            type: Date,
            default: null,
          },
        },
      ],
    },
    meter: {
      type: Number,
      required: true,
      default: 0,
    },
    doneAt: {
      type: Date,
      default: null,
    },
    tobedoneAt: {
      type: Date,
      required: [true, "Item must have expected date of finish"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const BucketItem = mongoose.model("bucket", BucketSchema);

module.exports = { User, BucketItem };
