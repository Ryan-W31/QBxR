import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import SearchCard from "../components/SearchCard";
import ProfileCard from "../components/ProfileCard";
import SearchPageFilterMenu from "@/components/SearchPageFilterMenu";
import { useDebounce } from "../lib/utils";
import { useSearchQuery } from "../hooks/users/userApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Profile = {
  userId: string;
  role: string;
  name: string;
  school: string;
  score: number;
};

type SearchUser = {
  userId: string;
  role: string;
  rank: number;
  name: string;
  school: string;
  score: number;
};

type Filters = {
  player: boolean;
  nonplayer: boolean;
  active: boolean;
  inactive: boolean;
  name: boolean;
  schoolOrg: boolean;
};

// SearchPage component. This component displays the search page with a search form and search results.
const SearchPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [openProfile, setOpenProfile] = useState<Profile>({
    userId: "",
    role: "",
    name: "",
    school: "",
    score: 0,
  });
  const [visibleRows, setVisibleRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortedUsers, setSortedUsers] = useState<SearchUser[]>([]);
  const [sortedBy, setSortedBy] = useState<keyof SearchUser>("score");
  const [direction, setDirection] = useState("desc");
  const [filters, setFilters] = useState<Filters>({
    player: false,
    nonplayer: false,
    active: false,
    inactive: false,
    name: true,
    schoolOrg: true,
  });

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
    isLoading,
    isSuccess,
  } = useSearchQuery(
    { search: debouncedSearchQuery, filters: filters },
    {
      skip: debouncedSearchQuery === "" || debouncedSearchQuery === undefined,
    }
  );

  const typedUsers = users as SearchUser[];

  useEffect(() => {
    if (typedUsers !== undefined && typedUsers.length > 0) {
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
      setTotalRows(typedUsers.length);
    }
  }, [typedUsers]);

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
  const handleRowClick = (profile: Profile) => {
    setShowProfile(true);
    setOpenProfile(profile);
    toggleBlur();
  };

  // Close the profile card and remove the blur effect
  const handleClose = () => {
    setShowProfile(false);
    setOpenProfile({ userId: "", role: "", name: "", school: "", score: 0 });
    toggleBlur();
  };

  const handleSort = (key: string) => {
    if (key === sortedBy) {
      setDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      setSortedBy(key as keyof SearchUser);
      setDirection("desc");
    }
  };

  const handleFilters = (filters: Filters) => {
    setFilters(filters);
  };

  // Display the leaderboard content
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
    tableContent = null;
  }

  // Search page content
  const content = (
    <div>
      <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="search" />

      <div className={showBlur ? "pointer-events-none blur-lg" : ""}>
        <ScrollToTop showMenu={showMenu} />
        <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="search" />
        <div className="flex h-full w-full items-center justify-center">
          <Card className="mx-6 mt-10 flex w-full max-w-screen-2xl flex-col justify-center space-y-12 rounded-lg border-t-4 border-primary p-6 md:space-y-0">
            <CardHeader className="mt-2 bg-transparent shadow-none">
              <h1 className="mb-4 text-center font-Audiowide text-6xl font-bold uppercase text-primary">Search</h1>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search Players, Coaches, Schools..."
                className="bg-foreground text-background focus:border-2 focus:border-primary"
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="nope"
              />
              <div className="my-4" />
              <SearchPageFilterMenu getFilters={handleFilters} />
            </CardContent>
            <CardContent className="relative overflow-hidden overflow-x-auto rounded-lg border-2 border-primary p-0 font-Audiowide">
              <table className="w-full table-auto divide-y divide-primary overflow-x-auto text-center text-sm text-foreground">
                <thead className="bg-dark-secondary text-xs text-foreground">
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
                <tbody className="divide-y divide-primary">{tableContent}</tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
      <ProfileCard
        myId={myId}
        userId={openProfile?.userId}
        role={openProfile?.role}
        name={openProfile?.name}
        school={openProfile?.school}
        score={Math.floor((openProfile?.score * 100) / 100)}
        isVisible={showProfile}
        onClose={handleClose}
      />
    </div>
  );

  return content;
};

export default SearchPage;
