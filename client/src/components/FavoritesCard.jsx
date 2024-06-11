import {
  Button,
  CardHeader,
  Input,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import SearchCard from "./SearchCard";
import ProfileCard from "./ProfileCard";
import { useSearchQuery } from "../hooks/users/userApiSlice";
import { useDebounce } from "../utils/utils";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useSelector } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

const FavoritesCard = ({ users, isLoading, isSuccess }) => {
  const [role, setRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(null);
  const [visibleRows, setVisibleRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortedBy, setSortedBy] = useState("score");
  const [direction, setDirection] = useState("desc");
  const [filters, setFilters] = useState({});

  const myId = useSelector(selectCurrentId);

  const cols = [
    { key: "role", title: "Type" },
    { key: "name", title: "Name" },
    { key: "school", title: "School/Organization" },
    { key: "score", title: "Score" },
  ];

  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
    },
    [searchQuery],
    800
  );

  useEffect(() => {
    if (users?.length > 0) {
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
      setTotalRows(users?.length);
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

  let tableContent;

  if (isLoading) {
    tableContent = [...Array(visibleRows)].map((_, index) => (
      <SearchCard key={index} skeleton={true} />
    ));
  } else if (isSuccess && sortedUsers.length > 0) {
    tableContent = sortedUsers.map((user) => (
      <SearchCard
        key={user._id}
        role={user.role}
        name={`${user.firstname} ${user.lastname}`}
        school={user.school_organization}
        score={user.score}
        onClick={() => handleRowClick(user)}
      />
    ));
  } else {
    tableContent = null;
  }

  return (
    <>
      <CardHeader className="bg-tranparent shadow-none text-3xl font-bold text-light-primary mt-0 text-center relative overflow-visible">
        Your Favorites
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-4 md:flex-row !bg-transparent overflow-visible shadow-none">
        <Tabs value="all" className="w-full">
          <TabsHeader
            className="bg-dark-primary rounded-full"
            indicatorProps={{ className: "bg-green-primary rounded-full" }}
          >
            <Tab
              value={"all"}
              className="text-light-primary font-Audiowide"
              onClick={() => setRole("all")}
            >
              All
            </Tab>
            <Tab
              value={"nonplayer"}
              className="text-light-primary font-Audiowide"
              onClick={() => setRole("nonplayer")}
            >
              Non-Player
            </Tab>
            <Tab
              value={"player"}
              className="text-light-primary font-Audiowide"
              onClick={() => setRole("player")}
            >
              Player
            </Tab>
          </TabsHeader>
        </Tabs>
        <div className="w-full">
          <Input
            label="Search"
            className="!font-Audiowide !text-light-secondary border-light-secondary focus:border-light-secondary"
            labelProps={{
              className:
                "!font-Audiowide !text-light-secondary peer-focus:text-light-secondary before:border-light-secondary peer-focus:before:!border-light-secondary after:border-light-secondary peer-focus:after:!border-light-secondary",
            }}
            autoComplete="nope"
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<AiOutlineSearch className="h-5 w-5 text-light-secondary" />}
          />
        </div>
      </CardBody>

      <CardBody className="relative overflow-scroll border-2 rounded-lg border-green-primary font-Audiowide p-0">
        <SkeletonTheme
          baseColor="#0C0C0C"
          highlightColor="#AAAAAA77"
          borderRadius="0.5rem"
          duration={1.5}
        >
          <table className="table-auto w-full text-sm text-center text-light-primary divide-y divide-green-primary overflow-x-auto">
            <thead className="text-xs text-light-primary bg-dark-secondary">
              <tr>
                {cols.map((col) => (
                  <th
                    className="py-3 cursor-pointer hover:bg-green-primary"
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex justify-center">
                      <Button
                        variant="text"
                        className="flex justify-center items-center gap-2 font-Audiowide text-light-primary py-0 !bg-transparent"
                      >
                        {col.title}
                        <FaSort />
                      </Button>
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
      </CardBody>
      <ProfileCard
        myId={myId}
        id={showProfile?._id}
        name={`${showProfile?.firstname} ${showProfile?.lastname}`}
        school={showProfile?.school_organization}
        score={showProfile?.score}
        isVisible={showProfile !== null}
        onClose={handleClose}
      />
    </>
  );
};

export default FavoritesCard;
