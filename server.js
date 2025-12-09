const express = require("express");
const path = require("path");
const url = require("url");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/:fakePath", (req, res) => {
  let search = req.query[""];
  let base = req.query.base;

  // If raw query style like =cats
  if (!search) {
    const parsed = url.parse(req.url);
    if (parsed.query && parsed.query.startsWith("=")) {
      search = parsed.query.substring(1);
    }
  }

  if (!search || !base) {
    return res.redirect("/");
  }

  // Build destination URL
  const redirectUrl = `${base}${encodeURIComponent(search)}`;
  res.redirect(redirectUrl);
});

// Home fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Running: http://localhost:${PORT}`));
