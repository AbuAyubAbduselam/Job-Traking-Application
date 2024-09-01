import styled from "styled-components";

const Wrapper = styled.section`
  nav {
    height: var(--nav-height);
    display: flex;
    align-items: center;
    background-color: #059669;
  }
  .logo {
    width: 70px;
    margin-left: 2rem;
  }

  .humster {
    position: absolute;
    right: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    margin-top: -5rem;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
  }
  h1 {
    font-weight: 700;
    text-align: center;
    span {
      color: var(--primary-500);
    }
  }

  .btn {
    padding: 1rem 3rem;
    border-radius: 2rem;
  }
  .two-login {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }
  .wave {
    position: absolute;
    bottom: 0.00001rem;

    transform: scaleX(-1);
  }

  .about {
    position: absolute;
    right: 15rem;
    background-color: var(--white);
    color: var(--green-dark);
  }
  .contact {
    position: absolute;
    right: 28rem;
    background-color: var(--white);
    color: var(--green-dark);
  }

  .main-img2 {
    display: none;
  }
  .main-img {
    margin-top: -10rem;
  }

  .admin {
    position: absolute;
    right: 2rem;
    background-color: var(--white);
    color: var(--green-dark);
  }
  @media (min-width: 768px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
  }

  @media screen and (max-width: 768px) {
    .about,
    .admin,
    .contact {
      visibility: hidden;
    }

    .main-img2 {
      display: block;
      width: 60%;
      margin-top: 5rem;
    }

    .main-img {
      display: none;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: -20rem;
    }
  }
`;
export default Wrapper;
