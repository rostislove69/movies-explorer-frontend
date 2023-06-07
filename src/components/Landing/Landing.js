import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import StudentInfo from "./StudentInfo/StudentInfo";
import Techs from "./Techs/Techs";

function Landing(){
  return(
    <>
      <Promo />
      <AboutProject />
      <Techs />
      <StudentInfo />
    </>
  )
}

export default Landing;