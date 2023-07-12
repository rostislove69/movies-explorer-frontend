import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null ? true : false
  );
  const [currentUser, setCurrentUser] = useState({});
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [query, setQuery] = useState(
    localStorage.getItem("query") !== null ? localStorage.getItem("query") : ""
  );
  const [isSavedMoviesQuery, setIsSavedMoviesQuery] = useState("");
  const [isSavedMoviesChecked, setIsSavedMoviesChecked] = useState(false);

  const [movies, setMovies] = useState(
    localStorage.getItem("lastFoundMovies") !== null
      ? JSON.parse(localStorage.getItem("lastFoundMovies"))
      : []
  );
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem("savedMovies") !== null
      ? JSON.parse(localStorage.getItem("savedMovies"))
      : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("checkboxStatus") !== null
      ? JSON.parse(localStorage.getItem("checkboxStatus"))
      : false
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) {
      tokenCheck();
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (currentPath === "/movies") {
      setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
      setIsSavedMoviesChecked(false);
      setIsSavedMoviesQuery("");
    }
  }, [currentPath]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoginError("");
      setRegistrationError("");
      setProfileError("");
      setProfileMessage("");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loginError, registrationError, profileError, profileMessage]);

  function startPreloader() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }

  function handleCloseAllWindows() {
    setIsOpenBurgerMenu(false);
  }

  function handleBurgerMenuClick() {
    setIsOpenBurgerMenu(true);
  }

  function handleRegister(name, email, password) {
    setIsLoading(true);
    mainApi
      .createUser(name, email, password)
      .then(() => {
        mainApi.login(email, password).then((data) => {
          localStorage.setItem("jwt", data.token);
          setCurrentUser({ ...currentUser, email: email });
          setLoggedIn(true);
          navigate("/movies");
        });
      })
      .catch((err) => setRegistrationError(err))
      .finally(() => setIsLoading(false));
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setCurrentUser({ ...currentUser, email: email });
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => setLoginError(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res);
        setProfileMessage("Данные успешно обновлены!");
      })
      .catch((err) => setProfileError(err))
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    setMovies([]);
    navigate("/");
    window.location.reload();
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .tokenCheck(jwt)
        .then((res) => {
          setCurrentUser({ email: res.email, name: res.name, _id: res._id });
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSearchFilms(query, checkboxStatus) {
    startPreloader();
    setQuery(query);
    setIsChecked(checkboxStatus);
    localStorage.setItem("query", query);
    localStorage.setItem("checkboxStatus", checkboxStatus);
    if (!localStorage.getItem("moviesList")) {
      moviesApi
        .getMovies()
        .then((res) => {
          localStorage.setItem("moviesList", JSON.stringify(res));
          setError("");
        })
        .then(() => {
          setTimeout(() => handleSearchFilms(query, checkboxStatus), 500);
        })
        .catch(() =>
          setError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          )
        );
    }
    if (localStorage.getItem("moviesList")) {
      const moviesList = JSON.parse(localStorage.getItem("moviesList"));
      if (checkboxStatus === true) {
        const shortMovies = moviesList.filter((e) =>
          e.duration < 41 ? e : null
        );
        const searchMovie = shortMovies.filter((e) =>
          e.nameRU.toLowerCase().includes(query.toLowerCase()) ? e : null
        );
        setMovies(searchMovie);
        localStorage.setItem("lastFoundMovies", JSON.stringify(searchMovie));
      } else {
        const searchMovie = moviesList.filter((e) =>
          e.nameRU.toLowerCase().includes(query.toLowerCase()) ? e : null
        );
        setMovies(searchMovie);
        localStorage.setItem("lastFoundMovies", JSON.stringify(searchMovie));
      }
    }
  }

  function handleSearchSavedFilms(query, checkboxStatus) {
    startPreloader();
    setIsSavedMoviesQuery(query);
    setIsSavedMoviesChecked(checkboxStatus);
    const moviesList = JSON.parse(localStorage.getItem("savedMovies"));
    if (checkboxStatus === true) {
      const shortMovies = moviesList.filter((e) =>
        e.duration < 41 ? e : null
      );
      const searchMovie = shortMovies.filter((e) =>
        e.nameRU.toLowerCase().includes(query.toLowerCase()) ? e : null
      );
      setSavedMovies(searchMovie);
    } else {
      const searchMovie = moviesList.filter((e) =>
        e.nameRU.toLowerCase().includes(query.toLowerCase()) ? e : null
      );
      setSavedMovies(searchMovie);
    }
  }

  function handleSaveMovie(data) {
    mainApi
      .saveMovie(data)
      .then((res) => {
        const updatedSavedMovieList = [...savedMovies, res];
        setSavedMovies(updatedSavedMovieList);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(updatedSavedMovieList)
        );
      })
      .catch((err) => console.log(err))
  }

  function handleDeleteMovie(data) {
    const savedLocalMoviesList = JSON.parse(localStorage.getItem("savedMovies"));
    const selectedMovie = savedMovies.find(
      (e) =>
        e.movieId === (data.movieId || data.id) &&
        e.owner._id === currentUser._id
    );
    mainApi
      .deleteMovie(selectedMovie._id)
      .then(() => {
        const updatedSavedMovieList = savedMovies.filter(
          (e) => e._id !== selectedMovie._id
        );
        setSavedMovies(updatedSavedMovieList);
        const updatedLocalMoviesList = savedLocalMoviesList.filter((e) => e._id !== selectedMovie._id)
        localStorage.setItem("savedMovies", JSON.stringify(updatedLocalMoviesList));
      })
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isOpen={isOpenBurgerMenu}
        isClose={handleCloseAllWindows}
        isClick={handleBurgerMenuClick}
        loggedIn={loggedIn}
      />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                isLoading={isLoading}
                error={error}
                movies={movies}
                onSearchFilms={handleSearchFilms}
                saveMovie={handleSaveMovie}
                deleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                isChecked={isChecked}
                query={query}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                isLoading={isLoading}
                loggedIn={loggedIn}
                element={SavedMovies}
                savedMovies={savedMovies}
                onDeleteMovie={handleDeleteMovie}
                onSearchSavedFilms={handleSearchSavedFilms}
                isSavedMoviesChecked={isSavedMoviesChecked}
                isSavedMoviesQuery={isSavedMoviesQuery}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isLoading={isLoading}
                loggedIn={loggedIn}
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
                profileError={profileError}
                profileMessage={profileMessage}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate replace to={"/"} />
              ) : (
                <Login
                  handleLogin={handleLogin}
                  error={loginError}
                  isLoading={isLoading}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate replace to={"/"} />
              ) : (
                <Register
                  onRegister={handleRegister}
                  error={registrationError}
                  isLoading={isLoading}
                />
              )
            }
          />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
