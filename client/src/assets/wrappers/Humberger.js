import styled from "styled-components";

const Wrapper = styled.section`
  .hamburger-menu {
    position: relative;
  }

  .menu-icon {
    display: none;
    color: #333;
    font-size: 2rem;
    cursor: pointer;
  }

  .nav-menu {
    display: none;
    list-style: none;
    position: absolute;
    top: 40px;
    right: 0;
    background-color: #fff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 0;
    margin: 0;
    z-index: 1000;
  }

  .nav-menu.active {
    display: block;
  }

  .nav-item {
    padding: 1rem;
  }

  .nav-links {
    color: #333;
    text-decoration: none;
    display: block;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .menu-icon {
      display: block;
    }
  }
`;
export default Wrapper;
