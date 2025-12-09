document.getElementById("make").onclick = async () => {
  const fake = document.getElementById("fakePath").value.trim();
  const base = document.getElementById("baseUrl").value.trim();
  const query = document.getElementById("search").value.trim();

  if (!fake || !base || !query) return;

  // send base info secretly
  const r = await fetch("/create", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ baseUrl: base, fakePath: fake })
  });

  const data = await r.json();
  const id = data.id;

  // clean link
  const url = `${location.origin}/${id}/${fake}/?=${encodeURIComponent(query)}`;

  const out = document.getElementById("link");
  out.href = url;
  out.textContent = url;
};
