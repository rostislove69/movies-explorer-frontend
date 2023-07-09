import "./SavedMoviesCard.css";

function SavedMoviesCard(props) {

  const time = Math.trunc(props.duration/60) + "ч" + " " + props.duration % 60 + "м.";

  function handleDeleteMovie(){
    props.onDelete(props.movie);
  }

  function click(){
    window.open(props.trailer);
  }

  return (
    <li className="elements__element">
      <div className="elements__image-block">
        <img className="elements__image" onClick={click} src={props.image} alt={`Превью фильма ${props.name}`} />
        <button className="elements__button-delete" onClick={handleDeleteMovie}></button>
      </div>
      <div className="elements__info-block">
        <p className="elements__film-name">{props.name}</p>
        <p className="elements__film-duration">{time}</p>
      </div>
    </li>
  );
}

export default SavedMoviesCard;
