import express from "express";

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
