import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    user: {
     type: String,
    },
  },
  {
    collection: "bookings",
    timestamps: true, 
  }
);

export default mongoose.model("Booking", bookingSchema);
