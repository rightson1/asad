import { Schema, model, models, Types } from "mongoose";

const Turf = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },
    images: [String],
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Turf || model("Turf", Turf);
