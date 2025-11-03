import express from "express";
import mongoose from "mongoose";
import Reservation from "./models/reservation.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));



app.get("/", (req, res) => res.send("Hello from Express on Render!"));

app.get("/api/hello", async (req, res) => {
  await new Promise(r => setTimeout(r, 500));
  res.json({
    data: {
      vin: "VIN123456789",
      make: "Toyota",
      model: "Camry",
      status: "active"
    },
    statusCode: 200
  });
});

app.post("/vehicles", async (req, res) => {
  res.json({
    data: {
      "resultCode": "2313231",
      "vin": "VinXXXXXXX",
      "status": "OK"
    },
    statusCode: 200
  });
});

app.get("/api/reservation", async (req, res) => {
  try {
    const items = await Reservation.find().lean();
    res.json({ statusCode: 200, data: { ResultCode: "xxxxxxx", data: { items: items } } })
  } catch {
    res.status(500).json({ statusCode: 500, data: { message: "ERROR MESSAGE " } });
  };
})


app.put("/api/reservation/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await Reservation.findOneAndUpdate(
      { ReservationNo: id },
      { $set: data },
      { new: true }
    );
    res.json({ statusCode: 200, message: "Updated successfully", result });
  } catch {
    res.status(500).json({ statusCode: 500, message: "Update failed" });
  }
})

app.post("/api/reservation", async (req, res) => {
  try {
    const data = req.body;

    const last = await Reservation.find().sort({ ReservationNo: -1 }).limit(1).toArray();
    const newNo = last.length > 0 ? last[0].ReservationNo + 1 : 1;

    newData.ReservationNo = newNo;
    const result = await Reservation.create(newData);
    res.json({ statusCode: 200, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: "Insert failed" });
  }
});

app.delete("/api/reservation/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Reservation.findOneAndDelete({ ReservationNo: id });
    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        message: "Reservation not found"
      });
    }

    res.json({
      statusCode: 200,
      message: "Deleted successfully",
      data: result
    });
  } catch {
    res.status(500).json({
      statusCode: 500,
      message: "Delete failed",
      error: error.message
    });
  }
})


app.put("api/reservation/set", async (req, res) => {
  try {
    const collection = db.collection("reservation_setting");
    const data = req.body;
    await collection.updateOne({}, { $set: data }, { upsert: true });
    res.json({ statusCode: 200, message: "Updated successfully", result });
  } catch {
    res.status(500).json({ error: error.message });
  }
})

app.get("api/reservation/set", async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection("reservation_setting");
    const result = await collection.findOne({});
    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        message: "No reservation setting found"
      });
    }
    res.json({
      statusCode: 200,
      message: "Fetched successfully",
      data: { ResultCode: "xxxxxxx", data: result }
    });
  } catch {
    res.status(500).json({ error: error.message });
  }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
