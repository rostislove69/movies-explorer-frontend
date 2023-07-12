import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard"
import { useEffect, useState } from "react";

function MoviesCardList(props) {
  const currentWidth = window.innerWidth;
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    if(currentWidth >= 900){
      if (quantity < 12){
        setQuantity(12);
        return;
      }
    }
    if(currentWidth > 480 && currentWidth < 900){
      if (quantity < 8){
        setQuantity(8);
      return;
      }
    }
    if(currentWidth <= 480){
      if (quantity < 5){
      setQuantity(5);
      return;
    }
    }
  }, [currentWidth]);

  function loadMore(){
    if(currentWidth >= 900 && currentWidth < 1500){
      const newQuantity = quantity + 3;
      setQuantity(newQuantity);
    } else if (currentWidth < 900) {
      const newQuantity = quantity + 2;
      setQuantity(newQuantity);
    } else if (currentWidth >= 1500){
      const newQuantity = quantity + 4;
      setQuantity(newQuantity);
    }
  };
  return (
    <>
      <section className="elements">
      <ul className="elements__grid">
        {props.movies.slice(0, quantity).map((movie) => (
          <MoviesCard 
            key={movie.id}
            card={movie}
            trailer={movie.trailerLink}
            name={movie.nameRU}
            duration={movie.duration}
            image={movie.image.url}
            saveMovie={props.saveMovie}
            deleteMovie={props.deleteMovie}
            savedMovies={props.savedMovies}
          />
        ))}
      </ul>
    </section>
    {props.movies.length > quantity && (<button onClick={loadMore} className="load-more__button">Ещё</button>)}
    </>
  );
}

export default MoviesCardList;
