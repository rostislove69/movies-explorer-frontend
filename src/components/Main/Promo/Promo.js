import Planet from "../../../images/logo-planet.svg";
import "./Promo.css";

function Promo(){
  return(
    <section className="project-info">
        <div className="project-info__info-block">
          <h1 className="project-info__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="project-info__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className="project-info__link" href="#about-project"><p>Узнать больше</p></a>
        </div>
        <img
          className="project-info__logo"
          src={Planet}
          alt="Логотип"
        />
      </section>
  );
}

export default Promo;