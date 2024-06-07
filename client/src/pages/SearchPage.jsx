import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import SearchCard from "../components/SearchCard";
import ProfileCard from "../components/ProfileCard";
import SearchPageFilterMenu from "../components/SearchPageFilterMenu";
import { useDebounce } from "../utils/utils";
import { useSearchQuery } from "../hooks/users/userApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useSelector } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSort } from "react-icons/fa";

// SearchPage component. This component displays the search page with a search form and search results.
const SearchPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(null);
  const [visibleRows, setVisibleRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortedBy, setSortedBy] = useState("score");
  const [direction, setDirection] = useState("desc");
  const [filters, setFilters] = useState({});

  const cols = [
    { key: "role", title: "Type" },
    { key: "name", title: "Name" },
    { key: "school", title: "School/Organization" },
    { key: "score", title: "Score" },
  ];
  const myId = useSelector(selectCurrentId);

  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
    },
    [searchQuery],
    800
  );
  const {
    data: users,
    error,
    isLoading,
    isSuccess,
  } = useSearchQuery(
    { search: debouncedSearchQuery, filters: filters },
    {
      skip: debouncedSearchQuery === "" || debouncedSearchQuery === undefined,
    }
  );

  useEffect(() => {
    if (users !== undefined && users.length > 0) {
      let sorted = [...users].sort((a, b) => {
        const aVal = a[sortedBy];
        const bVal = b[sortedBy];

        if (typeof aVal === "number" && typeof bVal === "number")
          if (direction === "asc") return aVal - bVal;
          else return bVal - aVal;
        else if (typeof aVal === "string" && typeof bVal === "string")
          if (direction === "asc") return bVal.localeCompare(aVal);
          else return aVal.localeCompare(bVal);

        return 0;
      });

      setSortedUsers(sorted);
    } else {
      setSortedUsers([]);
    }
  }, [users, sortedBy, direction]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setVisibleRows((prevVisibleRows) =>
          Math.min(prevVisibleRows + 10, totalRows)
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalRows]);

  // Set the total number of rows when the users data changes
  useEffect(() => {
    if (users) {
      setTotalRows(users.length);
    }
  }, [users]);

  // Toggle the visibility of the mobile menu
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  // Toggle the blur effect on the background
  const toggleBlur = () => {
    setShowBlur((prevState) => !prevState);
  };

  // Handle the row click event. Display the profile card for the selected user and blur the background.
  const handleRowClick = (profile) => {
    setShowProfile(profile);
    toggleBlur();
  };

  // Close the profile card and remove the blur effect
  const handleClose = () => {
    setShowProfile(null);
    toggleBlur();
  };

  const handleSort = (key) => {
    if (key === sortedBy) {
      setDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortedBy(key);
      setDirection("desc");
    }
  };

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  // Display the leaderboard content
  let tableContent;

  if (isLoading) {
    tableContent = [...Array(visibleRows)].map((_, index) => (
      <SearchCard key={index} skeleton={true} />
    ));
  } else if (isSuccess && sortedUsers.length > 0) {
    tableContent = sortedUsers.map((user) => (
      <SearchCard
        key={user.id}
        role={user.role}
        name={user.name}
        school={user.school}
        score={user.score}
        onClick={() => handleRowClick(user)}
      />
    ));
  } else {
    tableContent = null;
  }

  // Search page content
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
        <div className="flex flex-col justify-center items-center font-Audiowide">
          <div className="w-3/4 p-8 px-6 bg-dark-secondary/80 rounded-lg mt-10 space-y-10 border-t-4 border-green-primary min-w-96">
            <h1 className="text-6xl font-bold font-Audiowide text-green-primary text-center mb-4">
              Search
            </h1>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <AiOutlineSearch className="h-5 w-5 text-light-secondary" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 md:text-sm text-xs text-light-secondary border border-light-primary rounded-full bg-dark-secondary/80"
                placeholder="Search Players, Schools..."
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="nope"
              />
            </div>
            <SearchPageFilterMenu getFilters={handleFilters} />
            <div className="relative overflow-x-auto border-2 rounded-lg overflow-hidden border-green-primary font-Audiowide">
              <SkeletonTheme
                baseColor="#0C0C0C"
                highlightColor="#AAAAAA77"
                borderRadius="0.5rem"
                duration={1.5}
              >
                <table className="table-auto w-full text-sm text-center text-light-primary divide-y divide-green-primary">
                  <thead className="text-xs text-light-primary uppercase bg-dark-secondary">
                    <tr>
                      {cols.map((col) => (
                        <th
                          className="py-3 cursor-pointer"
                          key={col.key}
                          onClick={() => handleSort(col.key)}
                        >
                          <div className="flex justify-center items-center">
                            <p>{col.title}</p>
                            <FaSort className="ml-1" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-primary">
                    {tableContent}
                  </tbody>
                </table>
              </SkeletonTheme>
            </div>
          </div>
        </div>
      </div>
      <ProfileCard
        myId={myId}
        id={showProfile?.id}
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
