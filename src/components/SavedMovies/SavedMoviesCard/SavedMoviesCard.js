import "./SavedMoviesCard.css";
import Picture from "../../../images/pic__film.jpg";

function SavedMoviesCard(props) {
  return (
    <li className="elements__element">
      <div className="elements__image-block">
        <img className="elements__image" src={Picture} alt={`Превью фильма ${props.name}`} />
        <button className="elements__button-delete"></button>
      </div>
      <div className="elements__info-block">
        <p className="elements__film-name">{props.name}</p>
        <p className="elements__film-duration">{props.duration}</p>
      </div>
    </li>
  );
}

export default SavedMoviesCard;
