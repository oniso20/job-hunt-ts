import React from "react";

// React router imports
import { Outlet, useLoaderData } from "react-router-dom";

// Helper functions
import { fetchData } from "../helpers";

// Assets
import wave from "../assets/wave.svg";

// Components
import Nav from "../components/Nav";

// Loader
type LoaderData = {
  userName: string;
};

export const mainLoader = (): LoaderData => {
  const userName = fetchData("userName");
  return {
    userName: userName as string,
  };
};

const Main: React.FC = () => {
  const { userName } = useLoaderData() as LoaderData;
  return (
    <div className="layout">
      <Nav userName={userName ?? ""} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
