import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .students {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 600px) {
    .students {
      grid-template-columns: 1fr;
      row-gap: 2rem;
    }
  }
`;
export default Wrapper;
