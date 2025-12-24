interface Props {
  movie: {
    title: string;
    rating: string;
    image: string;
  };
}

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />
      <div className="movie-info">
        <strong>{movie.title}</strong>
        <div>⭐ {movie.rating}</div>
      </div>
    </div>
  );
};

export default MovieCard;
