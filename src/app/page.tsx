"use client";

import { useState } from "react";
import MapLeaflet from "../components/Map/MapLeafletClient";
import ReportTable from "../components/Map/ReportTable";
import { LocationSearch } from "../components/Search/LocationSearch";

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
      console.error("Failed to fetch NEPAssist data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 selection:bg-blue-100">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
            NEPAssist Report
          </h1>
          <div className="hidden md:block text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Environmental Analysis Tools
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= MAP SECTION ================= */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col">
              
              {/* Map Controls Header */}
              <div className="p-4 lg:p-6 border-b border-slate-100">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                      Interactive Explorer
                    </h2>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-lg tracking-wider">
                      v2.0 Stable
                    </span>
                  </div>

                  {/* 🔍 Location Search - High Z-Index to avoid map clipping */}
                  <div className="relative z-[60]">
                    <LocationSearch
                      onLocationSelect={({ lat, lng }: { lat: number; lng: number }) =>
                        handleLocation(lat, lng)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full z-10">
                <MapLeaflet onLocationSelect={handleLocation} />
              </div>
            </div>
          </section>

          {/* ================= REPORT SECTION ================= */}
          <section className="lg:col-span-5 h-full">
            <div className="lg:sticky lg:top-24 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col h-[500px] lg:h-[735px] overflow-hidden">
              
              <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-bold text-slate-700 text-sm">Location Analysis</h3>
                 {data && (
                   <button 
                     onClick={() => window.print()} 
                     className="text-xs font-medium text-blue-600 hover:text-blue-700 transition"
                   >
                     Export PDF
                   </button>
                 )}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Empty State */}
                {!data && !loading && (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Ready to Search</h4>
                    <p className="text-sm text-slate-500 max-w-[240px] leading-relaxed">
                      Select a point on the interactive map or search for an address to generate a report.
                    </p>
                  </div>
                )}

                {/* Loading State */}
                {loading && (
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="relative h-12 w-12 mb-4">
                      <div className="absolute h-full w-full rounded-full border-4 border-blue-50"></div>
                      <div className="absolute h-full w-full animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                    <p className="text-sm font-bold text-slate-800 animate-pulse">
                      Analyzing Data Points...
                    </p>
                  </div>
                )}

                {/* Report Content */}
                {!loading && data && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 p-2 md:p-4">
                    <ReportTable reportData={data} />
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}