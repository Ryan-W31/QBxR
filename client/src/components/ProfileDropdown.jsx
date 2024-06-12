import React, { useState, useCallback } from "react";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { selectCurrentUser } from "../hooks/auth/authSlice";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import usePersist from "../hooks/auth/usePersist";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "./Toast";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdOutlineLogout } from "react-icons/md";

// ProfileDropdown component. This component displays the profile dropdown for the application.
const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const [persist, setPersist] = usePersist();
  const { notify } = useToast();

  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const toggleProfileMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    navigate("/profile");
  };

  const handleSettingsClick = (event) => {
    event.preventDefault();
    navigate("/settings");
  };

  // Handle the logout event. If the user is logged out, display a success message and navigate to the login page
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

  // Return the profile dropdown menu
  return (
    <Menu open={isOpen} handler={toggleProfileMenu} placement="bottom-end">
      <MenuHandler>
        <Button
          ripple={false}
          className="flex bg-transparent items-center gap-4 px-0"
        >
          <div className="flex items-center justify-center h-9 w-9 bg-green-primary rounded-full border-2 border-light-primary hover:bg-green-secondary">
            <AiOutlineUser className="h-6 w-6" />
          </div>
          <div>
            <p className="font-Audiowide text-[0.5rem] text-light-primary text-left">{`${user?.firstname}`}</p>
            <p className="font-Audiowide text-[0.5rem] text-light-primary text-left">{`${user?.lastname}`}</p>
          </div>
        </Button>
      </MenuHandler>
      <MenuList className="p-0 bg-dark-secondary gap-y-2">
        <MenuItem
          onClick={handleProfileClick}
          className="flex items-center gap-2 rounded-b-none hover:!bg-green-primary w-full"
        >
          <AiOutlineUser className="h-4 w-4 text-light-primary" />

          <span className="text-light-primary font-Audiowide text-md">
            My Profile
          </span>
        </MenuItem>
        <MenuItem
          onClick={handleSettingsClick}
          className="flex items-center gap-2 rounded-none hover:!bg-green-primary w-full"
        >
          <AiOutlineSetting className="h-4 w-4 text-light-primary" />

          <span className="text-light-primary font-Audiowide text-md">
            Settings
          </span>
        </MenuItem>
        <hr className="border-light-primary" />
        <MenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-t-none hover:!bg-red-600 w-full"
        >
          <MdOutlineLogout className="h-4 w-4 text-light-primary" />

          <span className="text-light-primary font-Audiowide text-md">
            Log Out
          </span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileDropdown;
