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
    <ul className="mb-4 mt-2 flex flex-col gap-2 font-semibold uppercase lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Home Link */}
      <Button variant="link" asChild>
        <Link
          to="#"
          className={currentPageStyle(
            "home",
            currentPage,
            "relative block w-fit text-primary underline decoration-[3px] underline-offset-[6.27px]",
            "relative block w-fit"
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
            "relative block w-fit text-primary underline decoration-[3px] underline-offset-[6.27px]",
            "relative block w-fit"
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
            "relative block w-fit text-primary underline decoration-[3px] underline-offset-[6.27px]",
            "relative block w-fit"
          )}
        >
          How QBxR Works
        </Link>
      </Button>

      {/* End How QBxR Works Link */}
    </ul>
  ) : (
    <ul className="mb-4 mt-2 flex flex-col gap-2 font-semibold uppercase lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Home Link */}
      <Button variant="link" asChild>
        <Link
          to="/home"
          className={currentPageStyle(
            "home",
            currentPage,
            "relative block w-fit text-primary underline decoration-[3px] underline-offset-[6.27px]",
            "relative block w-fit"
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
            "relative block w-fit text-primary underline decoration-[3px] underline-offset-[6.27px]",
            "relative block w-fit"
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
            "relative block w-fit text-primary underline decoration-[3px] underline-offset-[6.27px]",
            "relative block w-fit"
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
        "sticky inset-x-0 top-0 z-50 mx-auto w-full border-b-2 border-primary bg-background-secondary/80 bg-opacity-80 p-6 shadow-md backdrop-blur-xl backdrop-saturate-200"
      )}
    >
      {/* Display the navigation bar (Depending on Landing Page) */}
      {/* QBxR Logo */}
      <div className="container flex max-w-screen-2xl items-center justify-between px-4">
        <div className="flex h-[60px] w-[120px] items-center justify-center">
          <a href="/home" className="text-center font-Audiowide text-3xl font-extrabold text-primary">
            QBxR
          </a>
        </div>
        {/* End QBxR Logo */}

        <div className="text-md flex items-center gap-6 font-Audiowide">
          <div className="hidden lg:block">{navList}</div>
        </div>

        {/* Sign In Link */}
        {isLandingPage ? (
          <div className="flex items-center">
            <Button className="hidden w-[120px] items-center justify-center text-center font-Audiowide lg:flex" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        ) : null}
        {/* End Sign In Link */}

        {/* Profile Dropdown */}
        {!isLandingPage ? <ProfileDropdown /> : null}
        {/* End Profile Dropdown */}

        {/* Mobile Menu (On Small Screen Size) */}
        <Menu className="h-10 w-10 cursor-pointer text-primary lg:hidden" onClick={toggleMenu} />
        {/* End Mobile Menu (On Small Screen Size) */}
      </div>
      {/* End Display the navigation bar (Depending on Landing Page) */}
    </nav>
  );
};

export default NavBar;
