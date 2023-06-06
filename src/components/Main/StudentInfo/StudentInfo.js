import "./StudentInfo.css";
import Avatar from "../../../images/avatar.jpg";
import Arrow from "../../../images/arrow.svg";

function StudentInfo() {
  return (
    <section className="student-info">
      <h2 className="student-info__title">Студент</h2>
      <div className="student-info__block">
        <div>
          <h3 className="student-info__subtitle">Ростислав</h3>
          <p className="student-info__prof-text">
            Фронтенд-разработчик, 25 лет
          </p>
          <p className="student-info__about">
            Решил сменить сферу деятельности на ту, которая мне больше
            импонирует, а именно информационные технологии. Среди всех
            направлений для себя я выделил именно front-end разработку, так как
            мне нравится наглядно видеть результат своей работы. Первым шагом к
            цели стало прохождение курса по HTML и CSS, после которого я понял,
            что мне действительно нравится веб-разработка. Помимо основной учебы
            в Я.Практикуме дополнительно читаю статьи, смотрю обучающие видео и
            подкасты с практикующими разработчиками, обсуждаю полученные знания
            со своими друзьями. После завершения обучения, я ищу возможность
            применить свои знания и навыки. В повседневной жизни люблю провести
            время с друзьями, поиграть в баскетбол и тащусь от онлайн игр.
            Мечтаю научиться играть на барабанах и танцевать.
          </p>
          <a
            className="student-info__git-link"
            href="https://github.com/rostislove69"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="student-info__image-container">
          <img
            className="student-info__photo"
            src={Avatar}
            alt="Фото студента"
          />
        </div>
      </div>
      <p className="student-info__text">Портфолио</p>
      <ul className="student-info__portfolio-list">
        <li className="student-info__portfolio-element">
          <a
            className="student-info__portfolio-element-link"
            href="https://github.com/rostislove69/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <img
            className="student-info__portfolio-element-icon"
            src={Arrow}
            alt="Стрелка перехода"
          />
        </li>
        <li className="student-info__portfolio-element">
          <a
            className="student-info__portfolio-element-link"
            href="https://github.com/rostislove69/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <img
            className="student-info__portfolio-element-icon"
            src={Arrow}
            alt="Стрелка перехода"
          />
        </li>
        <li className="student-info__portfolio-element">
          <a
            className="student-info__portfolio-element-link"
            href="https://projectmesto.nomoredomains.work/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <img
            className="student-info__portfolio-element-icon"
            src={Arrow}
            alt="Стрелка перехода"
          />
        </li>
      </ul>
    </section>
  );
}

export default StudentInfo;
