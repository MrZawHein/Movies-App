import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MovieCard from "./MovieCard";
import Pagination from "../pages/Pagination";
import Footer from "../components/Footer";

const PAGE_SIZE = 18;
const FILTERS = ["popular", "top-rated", "upcoming", "trending"];

interface Movie {
  id: number;
  title: string;
  posterURL: string;
  averageRating: number;
}

const Movies: React.FC = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("popular"); // ✅ ADD THIS

  // ✅ Fetch Movies
  useEffect(() => {
    fetch("http://localhost:8082/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // ✅ Delete Movie
  const handleDelete = (id: number) => {
    fetch(`http://localhost:8082/api/movies/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        setMovies(prev => prev.filter(m => m.id !== id));
      })
      .catch(err => console.error(err));
  };

  // ✅ Apply Search + Filter + Sort
  const filteredMovies = movies
    .filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (activeFilter) {
        case "top-rated":
          return b.averageRating - a.averageRating;

        case "popular":
          return b.averageRating - a.averageRating;

        case "trending":
          return b.averageRating - a.averageRating;

        case "upcoming":
          return 0; // needs releaseDate

        default:
          return 0;
      }
    });

  // ✅ Pagination
  const start = (page - 1) * PAGE_SIZE;
  const pagedMovies = filteredMovies.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(filteredMovies.length / PAGE_SIZE);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "90px 1rem 1rem" }}>
        <Navbar onSearch={setSearchQuery} />

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem"
        }}>
          <h2>Movies</h2>

          <button
            onClick={() => navigate("/create-movie")}
            style={{
              padding: "0.5rem 1rem",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            + Create Movie
          </button>
        </div>

        {/* Filters */}
        <div style={{ margin: "1rem 0" }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                setPage(1);
              }}
              style={{
                marginRight: "0.5rem",
                padding: "0.5rem 1rem",
                background: activeFilter === f ? "#0056b3" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(6, 1fr)",
          }}
        >
          {pagedMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          total={totalPages}
          onChange={setPage}
        />

        <Footer />
      </div>
    </div>
  );
};

export default Movies;
