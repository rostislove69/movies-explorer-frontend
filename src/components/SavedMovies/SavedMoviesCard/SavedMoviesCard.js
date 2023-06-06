import "./SavedMoviesCard.css";
import Picture from "../../../images/pic__film.jpg";

function SavedMoviesCard() {
  return (
    <li className="elements__element">
      <div className="elements__image-block">
        <img className="elements__image" src={Picture} alt="" />
        <button className="elements__button-delete"></button>
      </div>
      <div className="elements__info-block">
        <p className="elements__film-name">33 слова о дизайне</p>
        <p className="elements__film-duration">1ч 17м</p>
      </div>
    </li>
  );
}

export default SavedMoviesCard;
