import "./MoviesCard.css";
import Save from "../../../images/icon__save.svg";
import { useEffect, useState } from "react";

function MoviesCard(props) {
  const [isAdded, setIsAdded] = useState(false);
  const time = Math.trunc(props.duration/60) + "ч" + " " + props.duration % 60 + "м.";
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));

  function handleCardAdd(){
    props.saveMovie(props.card);
    setIsAdded(true);
  }

  function handleCardDelete(){
    props.deleteMovie(props.card);
    setIsAdded(false);
  }
  
  function click(){
    window.open(props.trailer);
  }

  useEffect(() => {
    if(savedMovies.find(e => e.movieId === props.card.id)){
      setIsAdded(true);
    } else {
      return;
    }
  }, [])

  return (
    <li className="elements__element">
      <div className="elements__image-block">
        <img className="elements__image" onClick={click} src={`https://api.nomoreparties.co/${props.image}`} alt={`Превью фильма ${props.name}`} />
        {!isAdded && (
          <button onClick={handleCardAdd} className="elements__button-save">Сохранить</button>
        )}
        {isAdded && (
          <img
          className="elements__logo-saved"
          src={Save}
          alt="Добавлено в сохраненные"
          onClick={handleCardDelete}
          />
        )}
      </div>
      <div className="elements__info-block">
        <p className="elements__film-name">{props.name}</p>
        <p className="elements__film-duration">{time}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
