import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req, res) => res.send("Hello from Express on Vercel!"));
app.get("/api/hello", async (req, res) => {
  await new Promise(r => setTimeout(r, 500));
  res.json({ message: "Hello after short delay!" });
});

const handler = serverless(app);

export default async function (req, res) {
  await handler(req, res);
}
