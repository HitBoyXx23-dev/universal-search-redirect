const express = require("express");
const path = require("path");
const { nanoid } = require("nanoid");
const url = require("url");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const redirectDB = {}; 
// { id: { baseUrl, fakePath } }

// Create a hidden redirect record
app.post("/create", (req, res) => {
  const { baseUrl, fakePath } = req.body;
  if (!baseUrl || !fakePath) return res.status(400).send("bad");

  const id = nanoid(8); // short random key

  redirectDB[id] = { baseUrl, fakePath };
  res.json({ id });
});

// Handle the redirect
app.get("/:id/:fakePath", (req, res) => {
  const { id, fakePath } = req.params;
  let search = req.query[""];

  // parse raw =query
  if (!search) {
    const parsed = url.parse(req.url);
    if (parsed.query && parsed.query.startsWith("=")) {
      search = parsed.query.substring(1);
    }
  }

  if (!search) return res.redirect("/");

  const record = redirectDB[id];
  if (!record || record.fakePath !== fakePath) return res.redirect("/");

  const finalUrl = record.baseUrl + encodeURIComponent(search);
  return res.redirect(finalUrl);
});

// fallback
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log("http://localhost:" + PORT));
