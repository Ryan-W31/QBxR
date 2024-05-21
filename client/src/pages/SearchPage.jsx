import React, { useState } from "react";
import { classNames } from "../utils/utils";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import SearchCard from "../components/SearchCard";
import ProfileCard from "../components/ProfileCard";
import { AiOutlineSearch } from "react-icons/ai";

const SearchPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [showProfile, setShowProfile] = useState(null);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  const toggleBlur = () => {
    setShowBlur((prevState) => !prevState);
  };

  const handleRowClick = (profile) => {
    setShowProfile(profile);
    toggleBlur();
    console.log(profile);
  };

  const handleClose = () => {
    setShowProfile(null);
    toggleBlur();
  };

  const data = [
    {
      id: 1,
      name: "John Doe",
      school: "Univeristy of Central Florida",
      score: 98,
    },
    {
      id: 2,
      name: "John Doe",
      school: "Univeristy of Central Florida",
      score: 75,
    },
    {
      id: 3,
      name: "John Doe",
      school: "Univeristy of Central Florida",
      score: 60,
    },
    {
      id: 4,
      name: "John Doe",
      school: "Univeristy of Central Florida",
      score: 25,
    },
  ];

  const content = (
    <div>
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="search"
      />

      <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
        <ScrollToTop showMenu={showMenu} />
        <NavBar
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          isLandingPage={false}
          currentPage="search"
        />
        <div className="flex flex-col justify-center items-center">
          <div className="w-3/4 p-8 px-6 bg-dark-secondary/80 rounded-lg mt-10 space-y-10 border-t-4 border-green-primary min-w-96">
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
                  class="block w-full p-4 ps-10 md:text-sm text-xs text-light-secondary border border-light-primary rounded-full bg-dark-secondary/80"
                  placeholder="Search Players, Schools..."
                  required
                />
                <button
                  type="submit"
                  class="text-light-primary absolute end-2.5 bottom-2.5 bg-green-primary hover:bg-green-secondary font-medium rounded-full text-xs md:text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="relative overflow-x-auto sm:rounded-lg font-Audiowide">
              <table className="table-auto w-full text-sm text-center text-light-primary">
                <thead className="text-xs text-light-primary uppercase bg-dark-secondary border-b">
                  <tr>
                    <th scope="col" className="py-3">
                      Name
                    </th>
                    <th scope="col" className="py-3">
                      School/Organization
                    </th>
                    <th scope="col" className="py-3">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <SearchCard
                      key={item.id}
                      name={item.name}
                      school={item.school}
                      score={item.score}
                      onClick={() => handleRowClick(item)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ProfileCard
        name={showProfile?.name}
        school={showProfile?.school}
        score={showProfile?.score}
        isVisible={showProfile !== null}
        onClose={handleClose}
      />
    </div>
  );

  return content;
};

export default SearchPage;
