import "./MoviesCard.css";
import Save from "../../../images/icon__save.svg";
import Picture from "../../../images/pic__film.jpg";

function MoviesCard() {
  return (
    <li className="elements__element">
      <div className="elements__image-block">
        <img className="elements__image" src={Picture} alt="" />
        <button className="elements__button-save">Сохранить</button>
        <img
          className="elements__logo-saved elements__logo-saved_hidden"
          src={Save}
          alt="Добавлено в сохраненные"
        />
      </div>
      <div className="elements__info-block">
        <p className="elements__film-name">33 слова о дизайне</p>
        <p className="elements__film-duration">1ч 17м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
