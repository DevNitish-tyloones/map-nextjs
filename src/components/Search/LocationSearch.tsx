"use client";

import { useState, useCallback } from "react";
import { useLocationSearch } from "@/src/hooks/useLocationSearch";
import { debounce } from "@/src/utils/debounce";
import { Search } from "lucide-react";

export function LocationSearch({ onLocationSelect }: any) {
  const { results, searchLocation, getCoordinates } = useLocationSearch();

  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (!value.trim()) {
        setIsDropdownOpen(false);
        return;
      }
      searchLocation(value);
      setIsDropdownOpen(true);
    }, 300),
    []
  );

  async function handleSelect(item: any) {
    setInputValue(item.description);

    setIsDropdownOpen(false);

    const { lat, lng } = await getCoordinates(item.place_id);

    onLocationSelect({ lat, lng });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search by zipcode, city, or area..."
          className="
            w-full bg-white text-black pl-11 pr-4 py-3 rounded-full
            shadow-md hover:shadow-lg focus:shadow-xl
            outline-none transition-all duration-200
            placeholder:text-gray-400
          "
        />
      </div>

      {/* Suggestions Dropdown */}
      {isDropdownOpen && results.length > 0 && (
        <ul
          className="
            absolute z-50 mt-2 w-full max-h-72 overflow-hidden
            rounded-2xl bg-white shadow-xl ring-1 ring-black/5
            animate-in fade-in slide-in-from-top-2
          "
        >
          {results.map((item: any) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="
                px-5 py-3 cursor-pointer text-sm text-gray-700
                hover:bg-gray-50 hover:text-black
                transition-colors truncate
              "
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
