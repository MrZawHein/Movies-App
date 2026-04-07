import { useState } from "react";

type FilterType = "popular" | "now_playing" | "top_rated" | "upcoming";

interface Props {
  onChange: (filter: FilterType) => void;
}

const MovieFilter = ({ onChange }: Props) => {
  const [active, setActive] = useState<FilterType>("popular");

  const filters: { key: FilterType; label: string }[] = [
    { key: "popular", label: "Popular" },
    { key: "now_playing", label: "Now playing" },
    { key: "top_rated", label: "Top rated" },
    { key: "upcoming", label: "Upcoming" }
  ];

  const handleClick = (key: FilterType) => {
    setActive(key);
    onChange(key);
  };

  return (
    <div role="group" className="movie-filter btn-group">
      {filters.map(f => (
        <button
          key={f.key}
          type="button"
          title={f.key}
          className={`btn ${
            active === f.key ? "btn-success" : "btn-transparent"
          }`}
          onClick={() => handleClick(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default MovieFilter;
