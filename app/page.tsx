"use client";

import { useState } from "react";
import ReportTable from "./components/ReportTable";
import MapLeaflet from "./components/MapLeaflet";

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLocation = async (lat: number, lng: number) => {
    setData(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/nepassist?lat=${lat}&lng=${lng}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-300 p-2 md:p-4 z-50">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-2 sticky top-0 z-50 bg-slate-300/80 backdrop-blur-md py-4 px-6 rounded-lg border border-slate-200 shadow-sm">
        <h1 className="flex justify-center items-center text-3xl font-bold text-slate-900 tracking-tight">
          NEPAssist Report API</h1>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Map Section - Takes up 7/12 of space on large screens */}
        <section className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[500px] lg:h-[600px] sticky top-2 z-40">
          <div className="p-4 border-b border-slate-100 bg-white/50 backdrop-blur-md flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">Interactive Map</span>
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded">Click to Select</span>
          </div>
          <div className="h-full w-full">
            <MapLeaflet onLocationSelect={handleLocation} />
          </div>
        </section>

        {/* Results Section - Takes up 5/12 of space */}
        <section className="lg:col-span-5 flex flex-col h-[500px] lg:h-[600px] sticky top-2 z-30">

          {/* Wrap the content in a scrollable container with a custom scrollbar */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar bg-white rounded-2xl shadow-sm border border-slate-200">

            {!data && !loading && (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="font-medium text-slate-600">No location selected</p>
                <p className="text-sm">Select a point on the map to view the report results here.</p>
              </div>
            )}

            {loading && (
              <div className="h-full p-8 flex flex-col items-center justify-center">
                <div className="relative h-16 w-16 mb-6">
                  <div className="absolute h-full w-full rounded-full border-4 border-slate-100"></div>
                  <div className="absolute h-full w-full animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                </div>
                <p className="text-lg font-semibold text-slate-800 animate-pulse">Analyzing Location...</p>
                <p className="text-sm text-slate-500 mt-2 text-center">Gathering environmental data...</p>
              </div>
            )}

            {!loading && data && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 p-4">
                <ReportTable reportData={data} />
              </div>
            )}

          </div>
        </section>

      </div>
    </main>
  );
}