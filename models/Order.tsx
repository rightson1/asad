import { Schema, model, models, Types } from "mongoose";

const Order = new Schema(
  {
    turf: {
      type: Types.ObjectId,
      ref: "Turf",
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    date: {
      type: Date,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    rate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    payment: {
      type: String,
      required: true,
      default: "pending",
    },
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

export default models.Order || model("Order", Order);
