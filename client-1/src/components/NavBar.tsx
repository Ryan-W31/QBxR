import { cn, currentPageStyle } from "../lib/utils";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { Button } from "./ui/button";

// NavBar component. This component displays the navigation bar for the application.
type NavBarProps = {
  showMenu: boolean;
  toggleMenu: () => void;
  isLandingPage: boolean;
  currentPage: string;
};
const NavBar = ({ showMenu, toggleMenu, isLandingPage, currentPage }: NavBarProps) => {
  const navList = isLandingPage ? (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 uppercase font-semibold">
      {/* Home Link */}
      <Button variant="link" asChild>
        <Link
          to="#"
          className={currentPageStyle(
            "home",
            currentPage,
            "relative w-fit block text-primary underline underline-offset-[6.27px] decoration-[3px]",
            "relative w-fit block"
          )}
        >
          Home
        </Link>
      </Button>
      {/*End Home Link */}

      {/* About Us Link */}
      <Button variant="link" asChild>
        <Link
          to="#"
          className={currentPageStyle(
            "about",
            currentPage,
            "relative w-fit block text-primary underline underline-offset-[6.27px] decoration-[3px]",
            "relative w-fit block"
          )}
        >
          About Us
        </Link>
      </Button>

      {/* End About Us Link */}

      {/* How QBxR Works Link */}
      <Button variant="link" asChild>
        <Link
          to="#"
          className={currentPageStyle(
            "how",
            currentPage,
            "relative w-fit block text-primary underline underline-offset-[6.27px] decoration-[3px]",
            "relative w-fit block"
          )}
        >
          How QBxR Works
        </Link>
      </Button>

      {/* End How QBxR Works Link */}
    </ul>
  ) : (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 uppercase font-semibold">
      {/* Home Link */}
      <Button variant="link" asChild>
        <Link
          to="/home"
          className={currentPageStyle(
            "home",
            currentPage,
            "relative w-fit block text-primary underline underline-offset-[6.27px] decoration-[3px]",
            "relative w-fit block"
          )}
        >
          Home
        </Link>
      </Button>
      {/* End Home Link */}

      {/* Leaderboard Link */}
      <Button variant="link" asChild>
        <Link
          to="/leaderboard"
          className={currentPageStyle(
            "leaderboard",
            currentPage,
            "relative w-fit block text-primary underline underline-offset-[6.27px] decoration-[3px]",
            "relative w-fit block"
          )}
        >
          Leaderboard
        </Link>
      </Button>
      {/* End Leaderboard Link */}

      {/* Search Link */}
      <Button variant="link" asChild>
        <Link
          to="/search"
          className={currentPageStyle(
            "search",
            currentPage,
            "relative w-fit block text-primary underline underline-offset-[6.27px] decoration-[3px]",
            "relative w-fit block"
          )}
        >
          Search
        </Link>
      </Button>
      {/* End Search Link */}
    </ul>
  );

  return (
    <nav
      className={cn(
        showMenu ? "blur-lg" : "",
        "sticky w-full inset-x-0 border-b-2 border-primary top-0 mx-auto bg-background-secondary/80 shadow-md bg-opacity-80 backdrop-blur-xl backdrop-saturate-200 p-6 z-50"
      )}
    >
      {/* Display the navigation bar (Depending on Landing Page) */}
      {/* QBxR Logo */}
      <div className="container px-4 flex items-center justify-between max-w-screen-2xl">
        <div className="flex items-center justify-center h-[60px] w-[120px]">
          <a href="/home" className="text-3xl font-extrabold text-primary font-Audiowide text-center">
            QBxR
          </a>
        </div>
        {/* End QBxR Logo */}

        <div className="flex items-center gap-6 font-Audiowide text-md">
          <div className="hidden lg:block">{navList}</div>
        </div>

        {/* Sign In Link */}
        {isLandingPage ? (
          <div className="flex items-center">
            <Button className="hidden lg:flex items-center justify-center font-Audiowide w-[120px] text-center" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        ) : null}
        {/* End Sign In Link */}

        {/* Profile Dropdown */}
        {!isLandingPage ? <ProfileDropdown /> : null}
        {/* End Profile Dropdown */}

        {/* Mobile Menu (On Small Screen Size) */}
        <Menu className="lg:hidden h-10 w-10 text-primary cursor-pointer" onClick={toggleMenu} />
        {/* End Mobile Menu (On Small Screen Size) */}
      </div>
      {/* End Display the navigation bar (Depending on Landing Page) */}
    </nav>
  );
};

export default NavBar;
