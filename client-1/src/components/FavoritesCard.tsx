import SearchCard from "./SearchCard";
import { useEffect, useState } from "react";
import { useGetUserFavoritesQuery } from "../hooks/users/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../hooks/auth/authSlice";
import { CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowDownUp } from "lucide-react";

type FavoriteUser = {
  userId: string;
  role: string;
  rank: number;
  name: string;
  school: string;
  score: number;
};

type Profile = {
  userId: string;
  role: string;
  name: string;
  school: string;
  score: number;
};

type FavoritesCardProps = {
  userId: string | null;
  setOpenProfile: (profile: Profile) => void;
  setShowProfile: (showProfile: boolean) => void;
  toggleBlur: () => void;
};
const FavoritesCard = ({ userId, setOpenProfile, setShowProfile, toggleBlur }: FavoritesCardProps) => {
  const [visibleRows, setVisibleRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortedUsers, setSortedUsers] = useState<FavoriteUser[]>([]);
  const [sortedBy, setSortedBy] = useState<keyof FavoriteUser>("score");
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

  const typedUsers = users as FavoriteUser[];

  useEffect(() => {
    refetch();
  }, [currentUser, refetch]);

  useEffect(() => {
    if (typedUsers?.length > 0) {
      let sorted = [...typedUsers].sort((a, b) => {
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
  }, [typedUsers, sortedBy, direction]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setVisibleRows((prevVisibleRows) => Math.min(prevVisibleRows + 10, totalRows));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalRows]);

  // Set the total number of rows when the users data changes
  useEffect(() => {
    if (typedUsers) {
      setTotalRows(typedUsers?.length);
    }
  }, [typedUsers]);

  // Handle the row click event. Display the profile card for the selected user and blur the background.
  const handleRowClick = (profile: Profile) => {
    setShowProfile(true);
    setOpenProfile(profile);
    toggleBlur();
  };

  // Close the profile card and remove the blur effect

  const handleSort = (key: string) => {
    if (key === sortedBy) {
      setDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      setSortedBy(key as keyof FavoriteUser);
      setDirection("desc");
    }
  };

  let tableContent;

  if (isLoading) {
    tableContent = [...Array(visibleRows)].map((_, index) => <SearchCard key={index} skeleton={true} />);
  } else if (isSuccess && sortedUsers.length > 0) {
    tableContent = sortedUsers.map((user) => (
      <SearchCard
        key={user.userId}
        role={user.role}
        name={user.name}
        school={user.school}
        score={Math.floor(user.score * 100) / 100}
        onClick={() => handleRowClick(user)}
      />
    ));
  } else {
    tableContent = (
      <tr>
        <td colSpan={4} className="text-md py-4 uppercase">
          You have no favorites.
        </td>
      </tr>
    );
  }

  return (
    <>
      <CardHeader className="relative overflow-visible p-6 text-center font-Audiowide text-3xl font-bold uppercase text-foreground shadow-none">
        Favorites
      </CardHeader>
      <CardContent className="relative overflow-scroll rounded-lg border-2 border-primary p-0 font-Audiowide">
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full table-auto divide-y divide-primary overflow-x-auto text-center text-sm text-foreground">
            <thead className="bg-background-secondary text-xs text-foreground">
              <tr>
                {cols.map((col) => (
                  <th className="cursor-pointer py-3" key={col.key} onClick={() => handleSort(col.key)}>
                    <div className="flex justify-center">
                      <Button
                        variant="link"
                        className="flex items-center justify-center gap-2 py-0 font-Audiowide font-semibold uppercase text-foreground"
                      >
                        {col.title}
                        <ArrowDownUp />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary uppercase">{tableContent}</tbody>
          </table>
        </div>
      </CardContent>
    </>
  );
};

export default FavoritesCard;
