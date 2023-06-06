import "./SavedMoviesCardList.css";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard"

function SavedMoviesCardList() {
  return (
    <section className="elements">
      <ul className="elements__grid">
        <SavedMoviesCard />
      </ul>
    </section>
  );
}

export default SavedMoviesCardList;
