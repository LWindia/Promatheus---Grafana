import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

// Placeholder proxy endpoint; replace target with Google App Script if desired.
app.post("/api/contact", async (req, res) => {
  // TODO: forward to Google App Script or email service; keeping stubbed for now.
  console.log("Contact submission", req.body);
  res.json({ ok: true, message: "Received" });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


