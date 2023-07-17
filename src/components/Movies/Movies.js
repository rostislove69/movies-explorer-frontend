import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies(props) {
  const lastQuery = localStorage.getItem("lastFoundMovies");
  return (
    <>
      <SearchForm
        onSearchFilms={props.onSearchFilms}
        isChecked={props.isChecked}
        query={props.query}
      />
      {props.isLoading ? (
        <Preloader />
      ) : props.error !== "" ? (
        <div className="movies__title">{props.error}</div>
      ) : lastQuery === null ? (
        <div className="movies__title">Начните поиск фильмов.</div>
      ) : props.movies.length < 1 ? (
        <div className="movies__title">
          По Вашему запросу ничего не найдено.
        </div>
      ) : (
        <MoviesCardList
          movies={props.movies}
          saveMovie={props.saveMovie}
          deleteMovie={props.deleteMovie}
          savedMovies={props.savedMovies}
        />
      )}
    </>
  );
}

export default Movies;
