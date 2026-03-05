import SearchFlightsForm from "../components/SearchForm";
import { useState } from "react";

export default function Flights() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] font-mono">
      <SearchFlightsForm
        onResults={setResults}
        onLoading={setLoading}
        onError={setError}
      />
      <div className="px-8 pb-16">
        {loading && (
          <div className="border-t border-[#222] pt-8">
            <p className="text-xs tracking-[0.3em] uppercase text-[#444] animate-pulse">
              Searching...
            </p>
          </div>
        )}
        {error && (
          <div className="border-t border-[#222] pt-8">
            <p className="text-xs tracking-[0.3em] uppercase text-[#FF4500]">
              {error}
            </p>
          </div>
        )}
        {results.length > 0 && (
          <div className="border-t border-[#222] pt-8">
            <p className="text-xs tracking-[0.3em] uppercase text-[#444] mb-8">
              {results.length} results
            </p>
            <div>
              {results.map((flight, index) => (
                <div
                  key={index}
                  className="border-b border-[#1a1a1a] py-5 flex items-center justify-between hover:bg-[#111] px-4 -mx-4 transition-colors duration-150"
                >
                  <span className="text-[#333] text-xs w-6 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#e8e0d0] text-sm font-bold tracking-wide w-48 shrink-0">
                    {flight.airline.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-3 text-sm flex-1">
                    <span>{formatTime(flight.departure)}</span>
                    <span className="text-[#333] text-xs">————</span>
                    <span>{formatTime(flight.arrival)}</span>
                    <span className="text-[#444] text-xs ml-2">
                      {formatDate(flight.departure)}
                    </span>
                  </div>
                  <span className="text-[#FF4500] font-black text-lg shrink-0">
                    ${flight.price}{" "}
                    <span className="text-[#444] text-xs font-normal">USD</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
