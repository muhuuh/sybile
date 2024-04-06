import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Get the current location
  const isAnalysisActive =
    location.pathname === "/" || location.pathname === "/main";

  return (
    <header className="bg-white border-b py-8 flex justify-between items-center px-24 shadow-md">
      <NavLink
        to="/main"
        className="text-3xl font-bold tracking-widest text-indogoDye"
      >
        ManyMe
      </NavLink>
      <div className="flex text-gray-600 text-xl justify-center gap-x-20 tracking-wider">
        <NavLink
          to="/main"
          className={`${
            isAnalysisActive
              ? "underline decoration-salmon font-bold"
              : "text-gray-700"
          }`}
        >
          Analysis
        </NavLink>
        <NavLink
          to="/demo"
          className={({ isActive }) =>
            isActive ? "underline decoration-salmon font-bold" : "text-gray-700"
          }
        >
          Demo
        </NavLink>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            isActive ? "underline decoration-salmon font-bold" : "text-gray-700"
          }
        >
          FAQ
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
