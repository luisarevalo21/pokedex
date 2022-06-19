import React from "react";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <div>
      Hello from home
      <ul>
        <li>
          <NavLink to="/home">home</NavLink>
        </li>
        <li>
          <NavLink to="/pokemon">pokemon</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Home;
