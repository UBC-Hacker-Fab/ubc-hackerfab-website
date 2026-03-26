import React from "react";
import { CircuitIcon } from "./icons/CircuitIcon";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden py-16 px-6 border-t border-ubc-slate/20 bg-ubc-blue">
      {/* Circuit board pattern background */}
      <div className="absolute inset-0 circuit-traces opacity-5">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L20,50 C25,50 25,40 30,40 L70,40 C75,40 75,60 80,60 L100,60"
            stroke="#F4FFF8"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M0,70 L30,70 C35,70 35,80 40,80 L60,80 C65,80 65,20 70,20 L100,20"
            stroke="#F4FFF8"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M50,0 L50,20 C50,25 40,25 40,30 L40,70 C40,75 60,75 60,80 L60,100"
            stroke="#F4FFF8"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M30,0 L30,40 C30,45 20,45 20,50 L20,100"
            stroke="#F4FFF8"
            strokeWidth="0.5"
            fill="none"
          />
          <circle cx="20" cy="50" r="1" fill="#8BAAAD" />
          <circle cx="40" cy="30" r="1" fill="#8BAAAD" />
          <circle cx="60" cy="80" r="1" fill="#8BAAAD" />
          <circle cx="80" cy="60" r="1" fill="#8BAAAD" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {/* Left column: Logo and info */}
          <div className="space-y-6 col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative">
                <CircuitIcon className="w-12 h-12 text-ubc-slate" />
                <div className="absolute inset-0 animate-pulse-slow bg-ubc-mint/10 rounded-full blur-sm"></div>
              </div>
              <div className="ml-4">
                <div className="font-aldrich text-2xl text-ubc-mint">
                  HACKER<span className="text-ubc-slate">FAB</span>
                </div>
                <div className="text-xs text-ubc-mint/60 tracking-widest">
                  UNIVERSITY OF BRITISH COLUMBIA
                </div>
              </div>
            </div>

            <p className="text-ubc-mint/70 text-sm">
              Student-run micro-fabrication lab making chips from scratch.
            </p>
          </div>

          {/* Middle column: Quick links - Hidden on mobile */}
          <div className="hidden md:block">
            <h3 className="text-ubc-mint text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-px bg-ubc-slate/40"></span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <a
                href="#mission"
                className="text-ubc-mint/70 hover:text-ubc-mint transition-colors inline-flex items-center group"
              >
                <span className="w-1 h-1 bg-ubc-slate mr-2 group-hover:bg-ubc-mint transition-colors"></span>
                Our Mission
              </a>
              <a
                href="#capabilities"
                className="text-ubc-mint/70 hover:text-ubc-mint transition-colors inline-flex items-center group"
              >
                <span className="w-1 h-1 bg-ubc-slate mr-2 group-hover:bg-ubc-mint transition-colors"></span>
                Projects
              </a>
              <a
                href="#sponsors"
                className="text-ubc-mint/70 hover:text-ubc-mint transition-colors inline-flex items-center group"
              >
                <span className="w-1 h-1 bg-ubc-slate mr-2 group-hover:bg-ubc-mint transition-colors"></span>
                Sponsors
              </a>
              <a
                href="#interest"
                className="text-ubc-mint/70 hover:text-ubc-mint transition-colors inline-flex items-center group"
              >
                <span className="w-1 h-1 bg-ubc-slate mr-2 group-hover:bg-ubc-mint transition-colors"></span>
                Join Us
              </a>
            </div>
          </div>

          {/* Right column: Contact */}
          <div>
            <h3 className="text-ubc-mint text-lg font-bold mb-6 relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-full h-px bg-ubc-slate/40"></span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-5 h-5 mt-0.5 mr-3 text-ubc-slate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="text-sm text-ubc-mint/70">
                  <p>2332 Main Mall</p>
                  <p>Vancouver, BC V6T 1Z4</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-5 h-5 mt-0.5 mr-3 text-ubc-slate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <a
                  href="mailto:contact@hackerfabubc.com"
                  className="text-sm text-ubc-mint/70 hover:text-ubc-mint transition-colors"
                >
                  contact@ubcfab.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-ubc-slate/20 flex flex-col md:flex-row justify-between items-center text-ubc-mint/50 text-xs">
          <p>
            &copy; {new Date().getFullYear()} HackerFab UBC. All rights
            reserved.
          </p>
          <p className="mt-2 md:mt-0">
            University of British Columbia |
            <a
              href="https://www.ubc.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ubc-mint/80 transition-colors ml-1"
            >
              ubc.ca
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
