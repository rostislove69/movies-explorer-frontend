import "./Login.css";
import Validation from "../../utils/Validation";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const validation = Validation(); // Создаем единственный экземпляр хука Validation
  const { errors, setErrors, validateForm } = validation; // Используем полученные значения из экземпляра

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email:
        value.trim() === ""
          ? ""
          : !/\S+@\S+\.\S+/.test(value)
          ? "Введите корректный адрес электронной почты"
          : "",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password:
        value.trim() === ""
          ? ""
          : value.length < 6
          ? "Пароль должен содержать не менее 6 символов"
          : "",
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validateForm("", email, password)) {
      props.handleLogin(email, password);
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === "") &&
      email !== "" &&
      password !== "" &&
      !props.isLoading
    );
  };

  return (
    <section className="login">
      <Link to="/">
        <img className="login__logo" src={Logo} alt="Логотип" />
      </Link>
      <h1 className="login__greetings">Рады видеть!</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__input-block">
          <label className="login__text">E-mail</label>
          <input
            className={`login__input ${
              errors.email ? "login__input_error" : ""
            }`}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            disabled={props.isLoading}
          />
          {errors.email && <span className="login__error">{errors.email}</span>}
        </div>
        <div className="login__input-block">
          <label className="login__text">Пароль</label>
          <input
            className={`login__input ${
              errors.password ? "login__input_error" : ""
            }`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={props.isLoading}
          />
          {errors.password && (
            <span className="login__error">{errors.password}</span>
          )}
        </div>
        <button
          className={`${
            !isFormValid()
              ? "login__button-login_disabled"
              : "login__button-login"
          }`}
          type="submit"
          disabled={!isFormValid()}
        >
          <span className="login__login-error">{props.error}</span>
          Войти
        </button>
      </form>
      <div className="login__block">
        <p className="login__text-not-register">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__button-register">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;