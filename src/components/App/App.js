import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    _id: "",
    email: "",
  });
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [query, setQuery] = useState(
    localStorage.getItem("query") !== null ? localStorage.getItem("query") : ""
  );
  const [isSavedMoviesQuery, setIsSavedMoviesQuery] = useState(
    localStorage.getItem("querySavedMovies") !== null
      ? localStorage.getItem("querySavedMovies")
      : ""
  );
  const [isSavedMoviesChecked, setIsSavedMoviesChecked] = useState(
    localStorage.getItem("checkboxStatusSavedMovies") !== null
      ? JSON.parse(localStorage.getItem("checkboxStatusSavedMovies"))
      : false
  );

  const [movies, setMovies] = useState(
    localStorage.getItem("lastFoundMovies") !== null
      ? JSON.parse(localStorage.getItem("lastFoundMovies"))
      : []
  );
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem("savedMovies") !== null
      ? JSON.parse(localStorage.getItem("lastFoundSavedMovies"))
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
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, movies]) => {
          setCurrentUser({
            ...currentUser,
            name: userData.name,
            _id: userData._id,
          });
          const lastFoundMovies = localStorage.getItem("lastFoundSavedMovies");
          if(lastFoundMovies === null){
            setSavedMovies(movies);
            localStorage.setItem("savedMovies", JSON.stringify(movies));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoginError("");
      setRegistrationError("");
      setProfileError("");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loginError, registrationError, profileError]);

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
    mainApi
      .createUser(name, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => setRegistrationError(err));
  }

  function handleLogin(email, password) {
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
      .catch((err) => setLoginError(err));
  }

  function handleUpdateUser(data) {
    mainApi
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => setProfileError(err));
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
          setCurrentUser({ ...currentUser, email: res.email });
          setLoggedIn(true);
          navigate("/movies");
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
    localStorage.setItem("querySavedMovies", query);
    localStorage.setItem("checkboxStatusSavedMovies", checkboxStatus);
    const moviesList = JSON.parse(localStorage.getItem("savedMovies"));
    if (checkboxStatus === true) {
      const shortMovies = moviesList.filter((e) =>
        e.duration < 41 ? e : null
      );
      const searchMovie = shortMovies.filter((e) =>
        e.nameRU.toLowerCase().includes(query.toLowerCase()) ? e : null
      );
      setSavedMovies(searchMovie);
      localStorage.setItem("lastFoundSavedMovies", JSON.stringify(searchMovie));
    } else {
      const searchMovie = moviesList.filter((e) =>
        e.nameRU.toLowerCase().includes(query.toLowerCase()) ? e : null
      );
      setSavedMovies(searchMovie);
      localStorage.setItem("lastFoundSavedMovies", JSON.stringify(searchMovie));
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
        if(isSavedMoviesQuery === "" && isSavedMoviesChecked === false){
          const arr = JSON.parse(localStorage.getItem("lastFoundSavedMovies"));
          arr.push(res);
          localStorage.setItem("lastFoundSavedMovies", JSON.stringify(arr));
        }
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie(data) {
    const selectedMovie = savedMovies.find(
      (e) => e.movieId === data.movieId && e.owner._id === currentUser._id
    );
    mainApi
      .deleteMovie(selectedMovie._id)
      .then(() => {
        const updatedSavedMovieList = savedMovies.filter(
          (e) => e._id !== selectedMovie._id
        );
        setSavedMovies(updatedSavedMovieList);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(updatedSavedMovieList)
        );
        const lastFoundSavedMoviesList = localStorage.getItem("lastFoundSavedMovies");
        if(lastFoundSavedMoviesList !== null && lastFoundSavedMoviesList !== "[]"){
          const updatedLastFoundSavedMoviesList = JSON.parse(lastFoundSavedMoviesList).filter(
            (e) => e._id !== selectedMovie._id
          );
          localStorage.setItem("lastFoundSavedMovies", JSON.stringify(updatedLastFoundSavedMoviesList));
        }
        
      })
      .catch((err) => console.log(err));
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
                loggedIn={loggedIn}
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
                profileError={profileError}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin} error={loginError} />}
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} error={registrationError} />
            }
          />
        </Routes>
      </main>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
