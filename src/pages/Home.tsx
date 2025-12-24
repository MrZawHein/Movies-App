import { useState } from "react";
import Navbar from "../components/Navbar";
import MovieFilter from "../components/MovieFilter";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { movies } from "../data/movies";

const PAGE_SIZE = 12;

const Home = () => {
  const [filter, setFilter] = useState("popular");
  const [page, setPage] = useState(1);

  const filteredMovies = movies; // later filter by type
  const startIndex = (page - 1) * PAGE_SIZE;
  const pagedMovies = filteredMovies.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(filteredMovies.length / PAGE_SIZE);

  return (
    <>
      <Navbar />

      <div className="container">
        <MovieFilter onChange={setFilter} />

        <div className="movie-grid">
          {pagedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <Pagination page={page} total={totalPages} onChange={setPage} />

        <Footer />
      </div>
    </>
  );
};

export default Home;
