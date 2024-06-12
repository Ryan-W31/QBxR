import { Button, CardHeader, CardBody } from "@material-tailwind/react";
import SearchCard from "./SearchCard";
import { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";
import { useGetUserFavoritesQuery } from "../hooks/users/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../hooks/auth/authSlice";

const FavoritesCard = ({ userId, setShowProfile, toggleBlur }) => {
  const [visibleRows, setVisibleRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortedBy, setSortedBy] = useState("score");
  const [direction, setDirection] = useState("desc");

  const cols = [
    { key: "role", title: "Type" },
    { key: "name", title: "Name" },
    { key: "school", title: "School/Organization" },
    { key: "score", title: "Score" },
  ];

  const currentUser = useSelector(selectCurrentUser);

  const {
    data: users,
    isLoading: isLoading,
    isSuccess: isSuccess,
    refetch,
  } = useGetUserFavoritesQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    refetch();
  }, [currentUser, refetch]);

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

  // Handle the row click event. Display the profile card for the selected user and blur the background.
  const handleRowClick = (profile) => {
    setShowProfile(profile);
    toggleBlur();
  };

  // Close the profile card and remove the blur effect

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
        name={user.name}
        school={user.school}
        score={user.score}
        onClick={() => handleRowClick(user)}
      />
    ));
  } else {
    tableContent = (
      <tr>
        <td colSpan="4" className="py-4 text-md">
          You have no favorites.
        </td>
      </tr>
    );
  }

  return (
    <>
      <CardHeader className="bg-tranparent shadow-none text-3xl font-bold text-light-primary text-center relative overflow-visible font-Audiowide p-6">
        Your Favorites
      </CardHeader>
      <CardBody className="relative overflow-scroll border-2 rounded-lg border-green-primary font-Audiowide p-0">
        <SkeletonTheme
          baseColor="#0C0C0C"
          highlightColor="#AAAAAA77"
          borderRadius="0.5rem"
          duration={1.5}
        >
          <div className="max-h-64 overflow-y-auto">
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
                          ripple={false}
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
          </div>
        </SkeletonTheme>
      </CardBody>
    </>
  );
};

export default FavoritesCard;
