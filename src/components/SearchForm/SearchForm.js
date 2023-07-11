import "./SearchForm.css";
import Find from "../../images/find.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [query, setQuery] = useState(
    currentPath === "/movies" ? props.query : props.savedQuery
  );
  const [isChecked, setIsChecked] = useState(
    currentPath === "/movies" ? props.isChecked : props.savedIsChecked
  );

  const handleSearch = (evt) => {
    evt.preventDefault();
    currentPath === "/movies"
      ? props.onSearchFilms(query, isChecked)
      : props.onSearchSavedFilms(query, isChecked);
  };

  const shortFilmsToggle = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const handleInputChange = (evt) => {
    setQuery(evt.terget.value);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearch}>
        <input
          className="search__search-input"
          value={query || ""}
          onChange={handleInputChange}
          type="text"
          placeholder="Фильм"
          name="film"
          maxLength="80"
          autoComplete="off"
          pattern="[а-яА-Яa-zA-Z\s\-]+"
        />
        <button className="search__submit-button" type="submit">
          <img src={Find} alt="Иконка поиска" />
        </button>
      </form>
      <div className="search__shortfilms-block">
        <p className="search__shortfilms-text">Короткометражки</p>
        <label className="search__shortfilms-button">
          <input
            className="search__shortfilms-input"
            type="checkbox"
            checked={isChecked}
            onChange={shortFilmsToggle}
          />
          <span className="search__shortfilms-tumbler round"></span>
        </label>
      </div>
    </section>
  );
}

export default SearchForm;