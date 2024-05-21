import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import { AiOutlineSearch } from "react-icons/ai";
import SearchCard from "../components/SearchCard";
import { classNames } from "../utils/utils";

const SearchPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const content = (
    <div class="h-screen bg-dark-primary">
      <ScrollToTop showMenu={showMenu} />
      <NavBar
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="search"
      />
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="search"
      />

      <div
        className={classNames(
          showMenu ? "blur-lg" : "",
          "flex flex-col bg-dark-primary justify-center items-center"
        )}
      >
        <div className="md:w-3/4 min-w-96 p-8 px-6 rounded-lg mt-10 space-y-10">
          <form class="mx-auto font-Audiowide">
            <label
              for="search"
              class="mb-2 text-sm font-medium text-light-secondary sr-only"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <AiOutlineSearch class="h-5 w-5 text-light-secondary" />
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-light-secondary border border-light-primary rounded-full bg-dark-secondary/80"
                placeholder="Search Players, Coaches, Schools..."
                required
              />
              <button
                type="submit"
                class="text-light-primary absolute end-2.5 bottom-2.5 bg-green-primary hover:bg-green-secondary font-medium rounded-full text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>

          <div className="relative overflow-x-auto sm:rounded-lg font-Audiowide">
            <table className="w-full text-md text-center text-light-primary rounded-lg">
              <thead className="text-md text-light-primary uppercase bg-dark-secondary border-b">
                <tr>
                  <th scope="col" className="lg:px-20 px-auto py-3">
                    Name
                  </th>
                  <th scope="col" className="lg:px-20 px-auto py-3">
                    School/Organization
                  </th>
                  <th scope="col" className="lg:px-20 px-auto py-3">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <SearchCard
                  name="John Doe"
                  school="University of Central Florida"
                  score="74"
                />
                <SearchCard
                  name="John Doe"
                  school="University of Central Florida"
                  score="73"
                />
                <SearchCard
                  name="John Doe"
                  school="University of Central Florida"
                  score="72"
                />
                <SearchCard
                  name="John Doe"
                  school="University of Central Florida"
                  score="71"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default SearchPage;
