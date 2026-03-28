"use client";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { key: "all", label: "All" },
  { key: "single-origin", label: "Single Origin" },
  { key: "blend", label: "Blends" },
  { key: "espresso", label: "Espresso" },
  { key: "dark", label: "Dark Roast" },
  { key: "medium", label: "Medium Roast" },
  { key: "light", label: "Light Roast" },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
            activeFilter === filter.key
              ? "bg-navy text-white"
              : "bg-transparent text-navy border-2 border-navy/20 hover:border-navy"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
