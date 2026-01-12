export function useNepAssist() {
  async function fetchReport(lat: number, lng: number) {
    const res = await fetch("/api/nepassist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng }),
    });

    return res.json();
  }

  return { fetchReport };
}
