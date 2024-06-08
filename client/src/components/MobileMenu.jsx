import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import { currentPageStyle } from "../utils/utils";
import usePersist from "../hooks/auth/usePersist";
import { useToast } from "./Toast";
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineSearch,
  AiOutlineInfoCircle,
  AiOutlineUser,
} from "react-icons/ai";
import {
  MdOutlineLeaderboard,
  MdOutlineSportsFootball,
  MdOutlineLogout,
} from "react-icons/md";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

// MobileMenu component. This component displays the mobile menu for the application.
const MobileMenu = ({ showMenu, toggleMenu, isLandingPage, currentPage }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const [persist, setPersist] = usePersist();
  const { notify } = useToast();

  const navigate = useNavigate();

  // Close the mobile menu when the window is resized to a width greater than or equal to 768 pixels
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && showMenu) {
        toggleMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenu, toggleMenu]);

  // Handle the logout event. If the user is logged out, display a success message and navigate to the login page.
  const handleLogout = useCallback(
    (event) => {
      event.preventDefault();
      if (persist) setPersist(false);
      logout();

      if (!isLoading) {
        notify("You have successfully logged out.", "success", "top-right");
        navigate("/login");
      }
    },
    [logout, isLoading, setPersist, persist, navigate, notify]
  );

  // If the user is logging out, display a loading message
  if (isLoading) return <div>Logging out...</div>;

  // Return the mobile menu
  return (
    <div>
      <Drawer
        placement="right"
        open={showMenu}
        onClose={toggleMenu}
        className="bg-dark-secondary/80"
      >
        <List>
          <div className="flex items-center justify-between w-full mt-4 mb-4">
            <h2 className="ml-1 text-3xl font-extrabold text-green-primary font-Audiowide">
              QBxR
            </h2>
            <AiOutlineClose
              onClick={toggleMenu}
              className="mr-1 cursor-pointer text-3xl text-green-primary"
            />
          </div>
          {isLandingPage ? (
            <>
              <Link
                to="#"
                className={currentPageStyle(
                  "home",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <AiOutlineHome />
                  </ListItemPrefix>
                  Home
                </ListItem>
              </Link>
              <Link
                to="#"
                className={currentPageStyle(
                  "about",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <AiOutlineInfoCircle />
                  </ListItemPrefix>
                  About Us
                </ListItem>
              </Link>
              <Link
                to="#"
                className={currentPageStyle(
                  "how",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <MdOutlineSportsFootball />
                  </ListItemPrefix>
                  How QBxR Works
                </ListItem>
              </Link>
              <Link className="mt-4" to="/login">
                <Button className="py-2 px-6 text-light-primary bg-green-primary rounded-full w-full hover:bg-green-secondary text-center text-lg font-Audiowide">
                  Sign In
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="#"
                className={currentPageStyle(
                  "home",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <AiOutlineHome />
                  </ListItemPrefix>
                  Home
                </ListItem>
              </Link>
              <Link
                to="#"
                className={currentPageStyle(
                  "leaderboard",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <MdOutlineLeaderboard />
                  </ListItemPrefix>
                  Leaderboard
                </ListItem>
              </Link>
              <Link
                to="#"
                className={currentPageStyle(
                  "search",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <AiOutlineSearch />
                  </ListItemPrefix>
                  Search
                </ListItem>
              </Link>
              <Link
                to="#"
                className={currentPageStyle(
                  "settings",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <AiOutlineSetting />
                  </ListItemPrefix>
                  Settings
                </ListItem>
              </Link>
              <Link
                to="#"
                className={currentPageStyle(
                  "profile",
                  currentPage,
                  "text-green-primary",
                  "text-light-primary hover:text-green-primary"
                )}
              >
                <ListItem className="text-lg font-Audiowide hover:text-green-primary hover:bg-transparent">
                  <ListItemPrefix>
                    <AiOutlineUser />
                  </ListItemPrefix>
                  Profile
                </ListItem>
              </Link>
            </>
          )}
        </List>
        {!isLandingPage ? (
          <div className="absolute w-full bottom-0 right-0">
            <List className="w-full p-0">
              <Link className="mt-4" to="/login">
                <Button
                  onClick={handleLogout}
                  className="py-2 px-6 text-light-primary bg-red-600 hover:bg-red-800 rounded-none w-full text-center text-lg font-Audiowide"
                >
                  <MdOutlineLogout className="inline-block mb-1 mr-2" />
                  Log Out
                </Button>
              </Link>
            </List>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default MobileMenu;
