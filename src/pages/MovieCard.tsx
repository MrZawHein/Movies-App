import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  posterURL: string;
  averageRating: number;
}

const MovieCard: React.FC<{ movie: Movie; onDelete?: (id: number) => void }> = ({ movie, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-movie/${movie.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      onDelete && onDelete(movie.id);
    }
  };

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      textAlign: "center"
    }}>
      <img
        src={movie.posterURL}
        alt={movie.title}
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />

      <h4>{movie.title}</h4>
      <p>⭐ {movie.averageRating}</p>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button
          onClick={handleEdit}
          style={{
            flex: 1,
            marginRight: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "5px",
            cursor: "pointer"
          }}
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          style={{
            flex: 1,
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "5px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
