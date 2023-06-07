import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard"
import cards from "../../../utils/cards";

function MoviesCardList() {
  return (
    <section className="elements">
      <ul className="elements__grid">
        {cards.map((card) => (
          <MoviesCard 
            name={card.name}
            duration={card.duration}
          />
        ))};
      </ul>
    </section>
  );
}

export default MoviesCardList;
