import React, { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineUser } from "react-icons/ai";
import { classNames } from "../utils/utils";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  if (isLoading) return <div>Logging out...</div>;

  return (
    <Menu as="div" className="hidden relative md:inline-block text-center">
      <div>
        <Menu.Button className="hidden h-9 w-9 text-light-primary bg-green-primary border border-light-primary rounded-full baseline hover:bg-green-secondary hover:text-light-secondary hover:border-light-secondary md:block">
          <AiOutlineUser className="mx-auto h-6 w-6" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-16 right-0 z-10 w-56 origin-top-right divide-y divide-light-secondary/80 rounded-md bg-dark-secondary/80 font-Audiowide text-md">
          <div>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/home"
                  className={classNames(
                    active
                      ? "bg-green-primary text-light-primary"
                      : "text-light-secondary",
                    "block px-4 py-2 rounded-t-md"
                  )}
                >
                  My Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/home"
                  className={classNames(
                    active
                      ? "bg-green-primary text-light-primary"
                      : "text-light-secondary",
                    "block px-4 py-2"
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
          </div>
          <div>
            <form onSubmit={handleLogout}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active
                        ? "bg-red-600 text-light-primary"
                        : "text-light-secondary",
                      "block w-full px-4 py-2 rounded-b-md text-center"
                    )}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
