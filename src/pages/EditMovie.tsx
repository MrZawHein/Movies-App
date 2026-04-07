import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Movie {
  title: string;
  posterURL: string;
  releaseDate: string;
  runtimeMinutes: number;
  averageRating: number;
  totalReviews: number;
}

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie>({
    title: "",
    posterURL: "",
    releaseDate: "",
    runtimeMinutes: 0,
    averageRating: 0,
    totalReviews: 0
  });

  useEffect(() => {
    fetch(`http://localhost:8082/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie({
          ...data,
          releaseDate: data.releaseDate?.split("T")[0]
        });
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMovie(prev => ({
      ...prev,
      [name]:
        name === "runtimeMinutes" ||
        name === "averageRating" ||
        name === "totalReviews"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`http://localhost:8082/api/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movie)
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Updated successfully");
        navigate("/");
      })
      .catch(console.error);
  };

  return (
  <div style={{ padding: "20px" }}>
    <h2>Edit Movie</h2>

    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px"
      }}
    >
      {/* Title */}
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={movie.title}
        onChange={handleChange}
      />

      {/* Poster URL */}
      <label htmlFor="posterURL">Poster URL</label>
      <input
        id="posterURL"
        name="posterURL"
        type="text"
        value={movie.posterURL}
        onChange={handleChange}
      />

      {/* Release Date */}
      <label htmlFor="releaseDate">Release Date</label>
      <input
        id="releaseDate"
        name="releaseDate"
        type="date"
        value={movie.releaseDate}
        onChange={handleChange}
      />

      {/* Runtime */}
      <label htmlFor="runtimeMinutes">Runtime Minutes</label>
      <input
        id="runtimeMinutes"
        name="runtimeMinutes"
        type="number"
        value={movie.runtimeMinutes}
        onChange={handleChange}
      />

      {/* Rating */}
      <label htmlFor="averageRating">Average Rating</label>
      <input
        id="averageRating"
        name="averageRating"
        type="number"
        step="0.1"
        value={movie.averageRating}
        onChange={handleChange}
      />

      {/* Reviews */}
      <label htmlFor="totalReviews">Total Reviews</label>
      <input
        id="totalReviews"
        name="totalReviews"
        type="number"
        value={movie.totalReviews}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  </div>
);
};

export default EditMovie;
