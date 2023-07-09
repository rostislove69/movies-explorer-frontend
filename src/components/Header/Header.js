import "./Header.css";
import Logo from "../../images/logo.svg";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header(props) {
  useEffect(() => {
    if (!props.isOpen) return;

    const onKeypress = (evt) => {
      if (evt.key === "Escape") {
        props.isClose();
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [props.isOpen]);

  const location = useLocation();
  const currentPath = location.pathname;
  const mainPageButtonsStyle =
    currentPath === "/" ? "header__account-button_main-page" : "";
  const mainPageBurgerMenuStyle =
    currentPath === "/" ? "header__burger-menu_main-page" : "";
  const getHeaderHide = () => {
    if (currentPath === "/signin" || currentPath === "/signup") {
      return "header_hide";
    } else {
      return "";
    }
  };

  const headerHide = getHeaderHide();

  return (
    <header
      className={`header ${headerHide}`}
    >
      <Link to="/" onClick={props.isEnterToMainPage}>
        <img src={Logo} className="header__logo" alt="Логотип" />
      </Link>
      <nav className={`${props.loggedIn === false ? "header__buttons-block_hide" : "header__buttons-block"}`}>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `header__film-button ${
              isActive ? "header__film-button_active" : ""
            } ${mainPageButtonsStyle}`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `header__film-button ${
              isActive ? "header__film-button_active" : ""
            } ${mainPageButtonsStyle}`
          }
        >
          Сохраненные фильмы
        </NavLink>
      </nav>
      <Link
        to="/profile"
        onClick={props.isExitFromMainPage}
        className={`${props.loggedIn === false ? "header__account-button_hide" : "header__account-button" }`}
      >
        Аккаунт
      </Link>
      <button
        onClick={props.isClick}
        className={`${props.loggedIn === false ? "header__burger-menu_hide" : "header__burger-menu" } ${mainPageBurgerMenuStyle}`}
      ></button>
      <div
        className={`header__menu ${props.isOpen ? "header__menu_active" : ""}`}
      >
        <nav className="header__menu-container">
          <button
            onClick={props.isClose}
            className="header__close-button"
          ></button>
          <NavLink
            to="/"
            onClick={props.isClose}
            className={({ isActive }) =>
              `header__menu-element ${
                isActive ? "header__menu-element_active" : ""
              }`
            }
          >
            <p className="header__menu-link">Главная</p>
          </NavLink>
          <NavLink
            to="/movies"
            onClick={props.isClose}
            className={({ isActive }) =>
              `header__menu-element ${
                isActive ? "header__menu-element_active" : ""
              }`
            }
          >
            <p className="header__menu-link">Фильмы</p>
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={props.isClose}
            className={({ isActive }) =>
              `header__menu-element ${
                isActive ? "header__menu-element_active" : ""
              }`
            }
          >
            <p className="header__menu-link">Сохранённые фильмы</p>
          </NavLink>
          <Link
            to="/profile"
            onClick={props.isClose}
            className="header__burger-account-button"
          >
            Аккаунт
          </Link>
        </nav>
      </div>
      <div className={`${props.loggedIn === false ? "header__buttons-not-auth" : "header__buttons-not-auth_hide" }`}>
        <Link to="/signup" className="header__registration">Регистрация</Link>
        <Link to="/signin" className="header__enter">Войти</Link>
      </div>
    </header>
  );
}

export default Header;
