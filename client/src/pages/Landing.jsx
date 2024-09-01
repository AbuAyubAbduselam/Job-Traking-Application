import Wrapper from "../assets/wrappers/LandingPage";
import { Humberger, Logo } from "../components";
import main from "../assets/images/main.svg";
import wave from "../assets/images/wave.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  const links = [
    { href: "/admin-login", text: "Admin" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <Wrapper>
      <nav>
        <Logo />
        <div className="humster">
          <Humberger links={links} />
        </div>
        <Link to="/contact" className="btn contact">
          contact us
        </Link>
        <Link to="/about" className="btn about">
          about
        </Link>
        <Link to="/admin-login" className="btn admin">
          Admin
        </Link>
      </nav>
      <div>
        <div className="container page">
          <div className="info">
            <img src={main} alt="quran" className="img main-img2" />

            <h1>ANSAR MESJID MEDRESA </h1>
            <div className="two-login">
              <Link to="/teacher-login" className="btn">
                User Login
              </Link>
            </div>
          </div>
          <img src={main} alt="quran" className="img main-img" />
        </div>

        <img src={wave} alt="wave" className="wave" />
      </div>
    </Wrapper>
  );
};

export default Landing;
