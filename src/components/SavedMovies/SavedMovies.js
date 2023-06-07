import SavedMoviesCardList from "./SavedMoviesCardList/SavedMoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(){
  return(
    <>
      <SearchForm />
      <SavedMoviesCardList />
    </>
  )
}

export default SavedMovies;