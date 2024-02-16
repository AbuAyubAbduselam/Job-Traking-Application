import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>we can&apos;t seem to find the page you are looking for</p>
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <div>
      <h3>Something went Wrong</h3>
      <Link to="/">Back Dashboard</Link>
    </div>
  );
};
export default Error;
