import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";
import "./SavedMoviesCardList.css";
import cards from "../../../utils/cards";

function SavedMoviesCardList() {
  return (
    <section className="elements">
      <ul className="elements__grid">
      {cards.map((card) => (
          <SavedMoviesCard 
            card={card}
            name={card.name}
            duration={card.duration}
          />
        ))};
      </ul>
    </section>
  );
}

export default SavedMoviesCardList;
