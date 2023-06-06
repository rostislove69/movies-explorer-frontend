import "./Login.css";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    if (!email) {
      return null; // нет ошибки при пустом вводе
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Введите корректный адрес электронной почты";
    }

    return "";
  };

  const validatePassword = () => {
    if (!password) {
      return null; // нет ошибки при пустом вводе
    }

    if (password.length < 6) {
      return "Пароль должен содержать не менее 6 символов";
    }

    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: value.trim() === '' ? '' : (!/\S+@\S+\.\S+/.test(value) ? 'Введите корректный адрес электронной почты' : ''),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: value.trim() === '' ? '' : (value.length < 6 ? 'Пароль должен содержать не менее 6 символов' : ''),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(),
      password: validatePassword(),
    };

    if (Object.values(newErrors).every((error) => error === null || error === "")) {
      console.log("Форма успешно отправлена");
      setEmail("");
      setPassword("");
      setErrors({});
    } else {
      setErrors(newErrors);
    }
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
            className={`login__input ${errors.email ? 'login__input_error' : ''}`}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            />
          {errors.email && <span className="login__error">{errors.email}</span>}
        </div>
        <div className="login__input-block">
          <label className="login__text">Пароль</label>
          <input 
            className={`login__input ${errors.password ? 'login__input_error' : ''}`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            />
          {errors.password && (
            <span className="login__error">{errors.password}</span>
          )}
        </div>
        <button className="login__button-login" type="submit">
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
