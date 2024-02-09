import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
   title: String,
   customerName: String,
   email: String,
   phoneNumber: String,
   guestCount: String,
   start: Date,
   end: Date,
   status: String,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
