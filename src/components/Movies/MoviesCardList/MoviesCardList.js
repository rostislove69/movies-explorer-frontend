import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList() {
  return (
    <section className="elements">
      <ul className="elements__grid">
        <MoviesCard />
      </ul>
    </section>
  );
}

export default MoviesCardList;
