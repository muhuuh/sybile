import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-50 px-8 py-8 flex justify-center items-center border-b-4 border-türkisDark px-24 shadow-md">
      <div className="text-3xl font-bold tracking-widest">Six Billes</div>
      <div className="flex flex-grow justify-center gap-x-8 tracking-wider">
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
