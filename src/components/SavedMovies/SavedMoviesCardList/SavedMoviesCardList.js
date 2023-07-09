import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";
import "./SavedMoviesCardList.css";

function SavedMoviesCardList(props) {
  return (
    <section className="elements">
      <ul className="elements__grid">
        {props.savedMovies.map((movie) => (
          <SavedMoviesCard
            key={movie.movieId}
            movie={movie}
            trailer={movie.trailerLink}
            name={movie.nameRU}
            duration={movie.duration}
            image={movie.image}
            onDelete={props.onDeleteMovie}
          />
        ))}
      </ul>
    </section>
  );
}

export default SavedMoviesCardList;
