import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ubc-blue/95 backdrop-blur-sm border-b border-ubc-slate/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-center md:justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="hidden md:flex items-center gap-8 text-ubc-mint hover:text-white transition-colors"
          >
            <img
              src="/images/logo.png"
              alt="UBC HackerFab logo"
              className="h-9 w-9 object-contain"
            />
            <span className="font-aldrich text-lg">UBC HackerFab</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive("/")
                  ? "text-white border-b-2 border-ubc-slate pb-1"
                  : "text-ubc-mint hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/team"
              className={`font-medium transition-colors ${
                isActive("/team")
                  ? "text-white border-b-2 border-ubc-slate pb-1"
                  : "text-ubc-mint hover:text-white"
              }`}
            >
              Team
            </Link>
            <Link
              to="/faq"
              className={`font-medium transition-colors ${
                isActive("/faq")
                  ? "text-white border-b-2 border-ubc-slate pb-1"
                  : "text-ubc-mint hover:text-white"
              }`}
            >
              FAQ
            </Link>
            <a
              href="https://app.youform.com/forms/mevgeqbt"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ubc-slate hover:bg-ubc-slate/90 text-ubc-blue font-medium px-4 py-2 rounded-md transition-colors"
            >
              Apply
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
