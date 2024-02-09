import { useNavigate, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const err = useRouteError();

  const back = () => {
    navigate(-1);
  };
  // console.log(err);
  return (
      <div className="error">
        <h1>{err.status}</h1>
        <h1>{err.statusText}</h1>
        <button className="backBtn" onClick={back}>Back To Previous Page</button>
      </div>
  );
};

export default Error;