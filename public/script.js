document.getElementById("generate").onclick = () => {
  const fake = document.getElementById("fakePath").value.trim()
  const base = document.getElementById("baseUrl").value.trim()
  const query = document.getElementById("search").value.trim()

  if(!fake || !base || !query) return

  // the real request uses ?base=destination
  const link = `${window.location.origin}/${fake}/?=${encodeURIComponent(query)}&base=${encodeURIComponent(base)}`

  const out = document.getElementById("output")
  out.href = link
  out.textContent = link
}
