import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    ReservationNo: Number,
    ActiveStatus: Number,
    Repetition: Object
}, { collection: "reservation_item" });

const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
