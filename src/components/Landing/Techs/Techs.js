import "./Techs.css";

function Techs(){
  return(
    <section className="project-technology">
        <h2 className="project-technology__title">Технологии</h2>
        <div className="project-technology__subtitle-block">
          <h3 className="project-technology__subtitle">7 технологий</h3>
          <p className="project-technology__text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className="project-technology__tech-list">
          <li className="project-technology__list-element">HTML</li>
          <li className="project-technology__list-element">CSS</li>
          <li className="project-technology__list-element">JS</li>
          <li className="project-technology__list-element">React</li>
          <li className="project-technology__list-element">Git</li>
          <li className="project-technology__list-element">Express.js</li>
          <li className="project-technology__list-element">mongoDB</li>
        </ul>
      </section>
  )
}

export default Techs;