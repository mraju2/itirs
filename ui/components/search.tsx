"use client";

import { Search as SearchIcon, MapPin } from "lucide-react";

interface SearchProps {
  onSearch: (query: string, location: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem("query") as HTMLInputElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement)
      .value;
    onSearch(query, location);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="query"
            placeholder="Job title, keywords, or company"
            className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
          />
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="location"
            placeholder="City, state, or remote"
            className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}
