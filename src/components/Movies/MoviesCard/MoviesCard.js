import "./MoviesCard.css";
import Save from "../../../images/icon__save.svg";
import Picture from "../../../images/pic__film.jpg";
import { useState } from "react";

function MoviesCard(props) {
  const [isAdded, setIsAdded] = useState(false);
  function handleCardAdd(){
    setIsAdded(true);
  }
  return (
    <li className="elements__element">
      <div className="elements__image-block">
        <img className="elements__image" src={Picture} alt={`Превью фильма ${props.name}`} />
        <button onClick={handleCardAdd} className={`${isAdded ? "elements__button-save_hidden" : "elements__button-save"}`}>Сохранить</button>
        <img
          className={`${isAdded ? "elements__logo-saved" : "elements__logo-saved_hidden"}`}
          src={Save}
          alt="Добавлено в сохраненные"
        />
      </div>
      <div className="elements__info-block">
        <p className="elements__film-name">{props.name}</p>
        <p className="elements__film-duration">{props.duration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
