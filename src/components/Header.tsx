import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isFiverrProOpen, setIsFiverrProOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };
  const toggleFiverrPro = () => {
    setIsFiverrProOpen(!isFiverrProOpen);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/img/png-transparent-fiverr-hd-logo.png"
            alt="Fiverr Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex space-x-6 text-gray-700 relative">
          <div className="relative">
            {/* Fiverr Pro Button */}
            <button
              onClick={toggleFiverrPro}
              className="hover:text-lime-500 flex items-center focus:outline-none"
            >
              Fiverr Pro
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`ml-1 transition-transform duration-500 ${
                  isFiverrProOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Fiverr Pro Dropdown */}
            {isFiverrProOpen && (
              <div className="absolute left-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50">
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                  <img
                    src="./img/hire-freelancer.e3fcf5a.svg"
                    className="m-2 place-self-center"
                  />
                  <a
                    href="https://pro.fiverr.com/?source=header_pop_up"
                    target="_blank"
                    className="block px-4 py-2 text-sm text-gray-700 "
                  >
                    I'm looking to hire
                    <ul className="font-normal">
                      My team needs vetted freelance talent and a premium
                      business solution.
                    </ul>
                  </a>
                </div>
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                  <img
                    src="\img\iam-freelancer.6e3c275.svg"
                    className="m-2 text-4xl place-self-center"
                  />
                  <a
                    href="https://www.fiverr.com/cp/pro-freelancers?source=header_pop_up"
                    target="_blank"
                    className="block px-4 py-2 text-sm text-gray-700 "
                  >
                    I want to offer Pro services
                    <ul className="font-normal">
                      I’d like to work on business projects as a Pro freelancer
                      or agency.
                    </ul>
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            {/* Explore Button */}
            <button
              onClick={toggleExplore}
              className="hover:text-lime-500 flex items-center focus:outline-none"
            >
              Explore
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`ml-1 transition-transform duration-300 ${
                  isExploreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Fiverr Pro Dropdown */}
            {isExploreOpen && (
              <div className="absolute left-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50">
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                <a
                  href="https://answers.fiverr.com/"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Answers
                  <ul className="font-normal">
                    Powered by AI, answered by Fiverr freelancers
                  </ul>
                </a>
                </div>
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                <a
                  href="https://events.fiverr.com/?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Community
                  <ul className="font-normal">
                    Connect with Fiverr’s team and community
                  </ul>
                </a>
                </div>
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                <a
                  href="https://www.fiverr.com/resources/guides?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Guides
                  <ul className="font-normal">
                  In-depth guides covering business topics
                  </ul>
                </a>
                </div>
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                <a
                  href="https://play.acast.com/s/ninetwentynine?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Podcast
                  <ul className="font-normal">
                  Inside tips from top business minds
                  </ul>
                </a>
                </div>
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                <a
                  href="https://learn.fiverr.com/?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Learn
                  <ul className="font-normal">
                  Professional online courses, led by experts
                  </ul>
                </a>
                </div>
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                <a
                  href="http://blog.fiverr.com/?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Blog
                  <ul className="font-normal">
                  News, information and community stories
                  </ul>
                </a>
                </div>
                <div className="flex hover:bg-gray-100 rounded-md border-solid border-[1px] border-opacity-90 border-gray-200 font-bold px-1 py-1 mx-3 my-3">
                <a
                  href="https://www.fiverr.com/logo-maker?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Logo maker
                  <ul className="font-normal">
                  Create your logo instantly
                  </ul>
                </a>
                </div>
              </div>
            )}

            {/* Dropdown for Explore */}
            {/* {isExploreOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                <a
                  href="https://answers.fiverr.com/"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Answers
                  <ul className="font-normal">
                    Powered by AI, answered by Fiverr freelancers
                  </ul>
                </a>
                <a
                  href="https://events.fiverr.com/?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Community
                  <ul className="font-normal">
                    Connect with Fiverr’s team and community
                  </ul>
                </a>
                <a
                  href="https://www.fiverr.com/resources/guides?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Guides
                  <ul className="font-normal">
                    In-depth guides covering business topics
                  </ul>
                </a>
                <a
                  href="https://play.acast.com/s/ninetwentynine?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Podcast
                  <ul className="font-normal">
                    Inside tips from top business minds
                  </ul>
                </a>
                <a
                  href="https://learn.fiverr.com/?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Learn
                  <ul className="font-normal">
                    Professional online courses, led by experts
                  </ul>
                </a>
                <a
                  href="http://blog.fiverr.com/?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Blog
                  <ul className="font-normal">
                    News, information and community stories
                  </ul>
                </a>
                <a
                  href="https://www.fiverr.com/logo-maker?source=explore-tab"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Logo Maker
                  <ul className="font-normal">Create your logo instantly</ul>
                </a>
              </div>
            )} */}
          </div>

          <a href="#" className="hover:text-lime-500">
            <FontAwesomeIcon icon={faGlobe} className="mr-1" />
            English
          </a>
          <a
            href="https://www.fiverr.com/start_selling?source=top_nav"
            target="_blank"
            className="hover:text-lime-500"
          >
            Become a Seller
          </a>
        </nav>

        {/* Sign In and Join buttons for desktop */}
        <div className="hidden md:flex space-x-4">
          <LoginModal />
          <RegisterModal />
        </div>

        {/* Mobile Menu Icon and Dropdown */}
        <div className="md:hidden flex items-center relative">
          <button onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-700" />
          </button>

          {/* Dropdown Menu for Mobile */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Fiverr Pro
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Explore
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                English
              </a>
              <a
                href="https://www.fiverr.com/start_selling?source=top_nav"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Become a Seller
              </a>
              <div className="border-t mt-2">
                <LoginModal />
                <RegisterModal />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;