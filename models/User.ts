import { Schema, model, models } from "mongoose";

const User = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      default: "active",
    },
    thumbnail: {
      type: String,
      default: null,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", User);
