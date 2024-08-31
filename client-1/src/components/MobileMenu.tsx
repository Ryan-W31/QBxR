import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import { currentPageStyle } from "../lib/utils";
import usePersist from "../hooks/auth/usePersist";
import { X, House, Info, CircleHelp, Trophy, Search, Settings, User, LogOut } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";

// MobileMenu component. This component displays the mobile menu for the application.
type MobileMenuProps = {
  showMenu: boolean;
  toggleMenu: () => void;
  isLandingPage: boolean;
  currentPage: string;
};
const MobileMenu = ({ showMenu, toggleMenu, isLandingPage, currentPage }: MobileMenuProps) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const [persist, setPersist] = usePersist();
  const { toast } = useToast();

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
  const handleLogout = () => {
    if (persist) setPersist(false);
    logout();

    if (!isLoading) {
      toast({ variant: "destructive", description: "You have successfully logged out." });
      navigate("/login");
    }
  };

  // If the user is logging out, display a loading message
  if (isLoading) return <div>Logging out...</div>;

  // Return the mobile menu
  return (
    <div>
      <Sheet open={showMenu} onOpenChange={toggleMenu}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>
              <h2 className="text-3xl font-extrabold text-primary font-Audiowide">QBxR</h2>
            </SheetTitle>
          </SheetHeader>
          {isLandingPage ? (
            <div className="w-full grid grid-cols-1 place-items-start gap-y-8 mt-12">
              <Button variant="link" asChild>
                <Link to="#" className={currentPageStyle("home", currentPage, "text-primary", "")}>
                  <div className="flex flex-row items-center">
                    <House className="mr-2" />
                    Home
                  </div>
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="#" className={currentPageStyle("about", currentPage, "text-primary", "")}>
                  <div className="flex flex-row items-center">
                    <Info className="mr-2" />
                    About Us
                  </div>
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="#" className={currentPageStyle("how", currentPage, "text-primary", "")}>
                  <div className="flex flex-row items-center">
                    <CircleHelp className="mr-2" />
                    How QBxR Works
                  </div>
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1">
              <Button variant="link" asChild>
                <Link
                  to="/home"
                  className={currentPageStyle(
                    "home",
                    currentPage,
                    "text-primary",
                    "text-light-primary hover:text-primary"
                  )}
                >
                  <House />
                  Home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link
                  to="/profile"
                  className={currentPageStyle(
                    "profile",
                    currentPage,
                    "text-primary",
                    "text-light-primary hover:text-primary"
                  )}
                >
                  <User />
                  Profile
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link
                  to="/leaderboard"
                  className={currentPageStyle(
                    "leaderboard",
                    currentPage,
                    "text-primary",
                    "text-light-primary hover:text-primary"
                  )}
                >
                  <Trophy />
                  Leaderboard
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link
                  to="/search"
                  className={currentPageStyle(
                    "search",
                    currentPage,
                    "text-primary",
                    "text-light-primary hover:text-primary"
                  )}
                >
                  <Search />
                  Search
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link
                  to="/settings"
                  className={currentPageStyle(
                    "settings",
                    currentPage,
                    "text-primary",
                    "text-light-primary hover:text-primary"
                  )}
                >
                  <Settings />
                  Settings
                </Link>
              </Button>
            </div>
          )}
          {!isLandingPage ? (
            <div className="absolute w-full bottom-0 right-0">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="py-2 px-6 text-light-primary rounded-none w-full text-center text-lg font-Audiowide"
              >
                <LogOut className="inline-block mb-1 mr-2" />
                Log Out
              </Button>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
