import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";

function App() {
  const [auth, setAuth] = useState(true);
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  function handleCloseAllWindows() {
    setIsOpenBurgerMenu(false);
  }

  function handleBurgerMenuClick() {
    setIsOpenBurgerMenu(true);
  }

  return (
    <>
      <Header
        isOpen={isOpenBurgerMenu}
        isClose={handleCloseAllWindows}
        isClick={handleBurgerMenuClick}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
