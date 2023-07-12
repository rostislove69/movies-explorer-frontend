import { useContext, useState, useEffect } from "react";
import validation from "../../utils/Validation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile(props) {
  const { errors, setErrors, validateForm } = validation();
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    setIsDataChanged(name !== currentUser.name || email !== currentUser.email);
    if(name === undefined || email === undefined){
      setEmail(currentUser.email);
    setName(currentUser.name);
    }
  }, [name, email, currentUser]);

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name:
        value.trim() === ""
          ? "Введите Ваше имя"
          : value.length < 2
          ? "Имя должно содержать не менее 2 символов"
          : !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)
          ? "Имя может содержать только буквы, пробелы и тире"
          : "",
    }));
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email:
        value.trim() === ""
          ? "Введите Ваш адрес электронной почты"
          : !/\S+@\S+\.\S+/.test(value)
          ? "Введите корректный адрес электронной почты"
          : "",
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validateForm(name, email)) {
      props.onUpdateUser({
        email: email,
        name: name,
      });
    }
  };

  const isFormValid = () => {
    const { email, name } = errors;
    return !(email || name) && isDataChanged;
  };

  return (
    <section className="profile">
      <h1 className="profile__name">Привет, {currentUser.name}!</h1>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__block">
          <p className="profile__text">Имя</p>
          <input
            onChange={handleNameChange}
            className="profile__input-name"
            type="text"
            placeholder="Имя"
            name="name"
            pattern="[а-яА-Яa-zA-Z\s\-]+"
            value={name || ""}
          />
        </div>
        {errors.name && <span className="profile__error">{errors.name}</span>}
        <div className="profile__block">
          <p className="profile__text">E-mail</p>
          <input
            onChange={handleEmailChange}
            className="profile__input-email"
            type="email"
            placeholder="E-mail"
            name="email"
            value={email || ""}
          />
        </div>
        {errors.email && <span className="profile__error">{errors.email}</span>}
        <button
          className="profile__button-edit"
          type="submit"
          disabled={!isFormValid()}
        >
          Редактировать
          <p className="profile__api-error">{props.profileError}</p>
          <p className="profile__api-success">{props.profileMessage}</p>
        </button>
      </form>
      <button className="profile__button-exit" onClick={props.onLogout}>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
