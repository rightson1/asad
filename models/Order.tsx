// Import necessary libraries and types
import { Schema, model, models, Types } from "mongoose";

// Define the schema for an Order
const Order = new Schema(
  {
    turf: {
      type: Types.ObjectId, // The ID of the turf
      ref: "Turf", // Reference to the Turf model
      required: true,
    },
    user: {
      type: Types.ObjectId, // The ID of the user
      ref: "User", // Reference to the User model
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
      required: true, // This field is required
    },
    totalPrice: {
      type: Number, // The total price of the order
      required: true,
    },
    status: {
      type: String, // The status of the order
      required: true,
      default: "pending", // The default value is "pending"
    },
    payment: {
      type: String, // The payment status of the order
      required: true,
      default: "pending", // The default value is "pending"
    },
    owner: {
      type: Types.ObjectId, // The ID of the owner
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Enable timestamps for the schema
  }
);

// Export the Order model, if it doesn't exist already
export default models.Order || model("Order", Order);
