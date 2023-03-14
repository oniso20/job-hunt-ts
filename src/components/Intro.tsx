import React from "react";

// assets
import data from "../assets/data.jpeg";

// React router imports
import { Form } from "react-router-dom";

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Intro: React.FC = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Are you on the
          <br />
          <span className="accent">Job Hunt?</span>
        </h1>
        <p>
          We understand the frustration and want to help you take control of
          your job search. Our web page is dedicated to providing you with a
          simple and effective way to track your job applications, all in one
          place.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="Enter your name"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={data} alt="Data on paper" width={600} />
    </div>
  );
};

export default Intro;
