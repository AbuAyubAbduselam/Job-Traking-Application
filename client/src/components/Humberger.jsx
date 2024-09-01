import { FaBars, FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Humberger";
import { useState } from "react";

const HamburgerMenu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper className="hamburger-menu">
      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
        {links.map((link, index) => (
          <li key={index} className="nav-item">
            <a href={link.href} className="nav-links" onClick={toggleMenu}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default HamburgerMenu;
