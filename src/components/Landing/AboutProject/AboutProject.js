import "./AboutProject.css";

function AboutProject(){
  return(
    <section className="about-project" id="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__subtitle-block">
          <div className="about-project__subtitle-container">
            <h3 className="about-project__subtitle">
              Дипломный проект включает 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__subtitle-container">
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__scale">
          <div className="about-project__backend">
            <span className="about-project__backend-text">1 неделя</span>
            <span className="about-project__underscale-text">Back-end</span>
          </div>
          <div className="about-project__frontend">
            <span className="about-project__frontend-text">4 недели</span>
            <span className="about-project__underscale-text">Front-end</span>
          </div>
        </div>
      </section>
  )
}

export default AboutProject;