import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import React from "react";

// React router imports
import { Link, useNavigate, useRouteError } from "react-router-dom";

const Error: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Uh oh! we have got a problem.</h1>
      <p>{(error as { message?: string; statusText?: string })?.message || (error as { message?: string; statusText?: string })?.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Home page</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
