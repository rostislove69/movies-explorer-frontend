import "./SearchForm.css";
import Find from "../../../images/find.svg";

function SearchForm(){
  return(
    <section className="search">
        <form className="search__form">
          <input className="search__search-input" type="text" placeholder="Фильм" name="film" required minLength="1" maxLength="80" />
          <button className="search__submit-button" type="submit"><img src={Find} alt="Иконка поиска" /></button>
        </form>
        <div className="search__shortfilms-block">
          <p className="search__shortfilms-text">Короткометражки</p>
          <label className="search__shortfilms-button">
            <input className="search__shortfilms-input" type="checkbox" />
            <span className="search__shortfilms-tumbler round"></span>
          </label>
        </div>
      </section>
  )
}

export default SearchForm;