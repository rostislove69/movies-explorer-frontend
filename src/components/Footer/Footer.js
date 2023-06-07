import "./Footer.css";
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  const getFooterHide = () => {
    if (currentPath === '/signin' || currentPath === '/signup' || currentPath === '/profile') {
      return "footer_hide";
    } else {
      return "";
    }
  };

  const footerHide = getFooterHide();

  return(
    <footer className={`footer ${footerHide}`}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__block">
        <p className="footer__text">© 2023</p>
        <nav className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/topics/yandex-praktikum" target="_blank" rel="noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;