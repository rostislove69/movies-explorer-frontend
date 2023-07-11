import SavedMoviesCardList from "./SavedMoviesCardList/SavedMoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  return (
    <>
      <SearchForm
        onSearchFilms={props.onSearchFilms}
        isChecked={props.isChecked}
        query={props.query}
        onSearchSavedFilms={props.onSearchSavedFilms}
        savedQuery={props.isSavedMoviesQuery}
        savedIsChecked={props.isSavedMoviesChecked}
      />
      {props.isLoading ? (
        <Preloader />
      ) : props.isSavedMoviesChecked !== false  ||  props.isSavedMoviesQuery !== "" ? (
        <div className="movies__title">По Вашему запросу ничего не найдено.</div>
      ) : props.savedMovies.length < 1 ? (
        <div className="movies__title">У Вас нет сохраненных фильмов.</div>
      ) : (
        <SavedMoviesCardList
          savedMovies={props.savedMovies}
          onDeleteMovie={props.onDeleteMovie}
        />
      )}
    </>
  );
}

export default SavedMovies;
