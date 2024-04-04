import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-200 py-8 flex justify-center items-center border-b-4 border-teal-800 px-24 shadow-md">
      <NavLink
        to="/main"
        className="text-3xl font-bold tracking-widest text-teal-700"
      >
        Six Billes
      </NavLink>
      <div className="flex flex-grow text-gray-700 justify-center gap-x-8 tracking-wider">
        <NavLink to="/main" activeClassName="underline" className="text-xl ">
          Analysis
        </NavLink>
        <NavLink to="/demo" activeClassName="underline" className="text-xl">
          Demo
        </NavLink>
        <NavLink to="/faq" activeClassName="underline" className="text-xl">
          FAQ
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
