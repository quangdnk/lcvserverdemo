import express from "express";
import serverless from "serverless-http"; // 👈 Chuyển express thành function

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Express running on Vercel!");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello world!" });
});

// 👇 Đây là phần quan trọng nhất
export default serverless(app);
