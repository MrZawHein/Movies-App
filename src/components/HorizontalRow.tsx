import MovieCard from "./MovieCard";

interface Props {
  title: string;
  movies: any[];
}

const HorizontalRow = ({ title, movies }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      <div className="movie-row">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default HorizontalRow;
