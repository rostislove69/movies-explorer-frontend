import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState("Ростислав");
  const [email, setEmail] = useState("pochta@yandex.ru")

  function handleChangeName(evt){
    setName(evt.target.value);
  }

  function handleChangeEmail(evt){
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="profile">
      <h1 className="profile__name">Привет, {name}!</h1>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__block">
          <p className="profile__text">Имя</p>
          <input
            onChange={handleChangeName}
            className="profile__input-name"
            type="text"
            placeholder={name}
            name="name"
            required
            minLength="2"
            maxLength="40"
          />
        </div>
        <div className="profile__block">
          <p className="profile__text">E-mail</p>
          <input
            onChange={handleChangeEmail}
            className="profile__input-email"
            type="email"
            placeholder={email}
            name="email"
            required
          />
        </div>
        <button className="profile__button-edit" type="submit">
          Редактировать
        </button>
      </form>
      <Link to="/signin" className="profile__button-exit">
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
