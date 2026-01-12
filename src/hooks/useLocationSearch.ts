import { useState } from "react";

export function useLocationSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchLocation(input: string) {
    if (!input) return;

    setLoading(true);
    const res = await fetch(`/api/google/autocomplete?input=${input}`);
    const data = await res.json();

    setResults(data.predictions || []);
    setLoading(false);
  }

  async function getCoordinates(placeId: string) {
    const res = await fetch(`/api/google/geocode?placeId=${placeId}`);
    return res.json();
  }

  return {
    results,
    loading,
    searchLocation,
    getCoordinates,
  };
}
