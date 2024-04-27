import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Get the current location
  const isAnalysisActive =
    location.pathname === "/" ||
    location.pathname === "/main" ||
    location.pathname === "/main/payment/lookup" ||
    location.pathname === "/main/analysis/lookup" ||
    location.pathname === "/main/payment/predictive" ||
    location.pathname === "/main/analysis/predictive";

  return (
    <header className="bg-white border-b py-8 flex justify-between items-center px-24 shadow-md">
      <NavLink
        to="/main"
        className="flex items-center text-3xl font-bold tracking-widest text-indogoDye"
      >
        <img
          src={`${process.env.PUBLIC_URL}/manyme-main.png`}
          alt="ManyMe Logo"
          className="h-12 mr-2"
        />
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
