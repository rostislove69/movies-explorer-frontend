import "./Register.css";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateName = () => {
    if (name.trim() === '') {
      return 'Введите ваше имя';
    }
    return '';
  };

  const validateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Введите корректный адрес электронной почты';
    }
    return '';
  };

  const validatePassword = () => {
    if (password.length < 6) {
      return 'Пароль должен содержать не менее 6 символов';
    }
    return '';
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: value.trim() === '' ? '' : (value.length < 2 ? 'Имя должно содержать не менее 2 символов' : ''),
    }));
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
      name: validateName(),
      email: validateEmail(),
      password: validatePassword(),
    };

    if (Object.values(newErrors).every((error) => error === '')) {
      // Отправка данных формы или другие действия
      console.log('Форма успешно отправлена');
      // Сброс значений инпутов и ошибок
      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="register">
      <Link to="/">
        <img className="register__logo" src={Logo} alt="Логотип" />
      </Link>
      <h1 className="register__greetings">Добро пожаловать!</h1>
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__input-block">
          <label className="register__text">Имя</label>
          <input
            className={`register__input ${errors.name ? 'register__input_error' : ''}`}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <span className="register__error">{errors.name}</span>
          )}
        </div>
        <div className="register__input-block">
          <label className="register__text">E-mail</label>
          <input
            className={`register__input ${errors.email ? 'register__input_error' : ''}`}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && (
            <span className="register__error">{errors.email}</span>
          )}
        </div>
        <div className="register__input-block">
          <label className="register__text">Пароль</label>
          <input
            className={`register__input ${errors.password ? 'register__input_error' : ''}`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && (
            <span className="register__error">{errors.password}</span>
          )}
        </div>
        <button
          className="register__button-registration"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__block">
        <p className="register__text-already-register">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__button-enter">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
