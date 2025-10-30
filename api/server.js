import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req, res) => {
    // Trả về ngay, không đợi gì
    res.send("Hello from Express on Vercel!");
});

app.get("/api/hello", async (req, res) => {
    // Ví dụ API bất đồng bộ an toàn
    await new Promise(resolve => setTimeout(resolve, 500)); // chờ 0.5s thôi
    res.json({ message: "Hello after short delay!" });
});

// Không app.listen()
export default serverless(app);
