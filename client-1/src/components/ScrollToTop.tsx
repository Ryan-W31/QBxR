import { useState, useEffect } from "react";
import { ArrowUpFromLine } from "lucide-react";
import { cn, scrollToTop } from "../lib/utils";
import { Button } from "./ui/button";

// ScrollToTop component. This component displays a button that scrolls to the top of the page when clicked.
type ScrollToTopProps = {
  showMenu: boolean;
};
const ScrollToTop = ({ showMenu }: ScrollToTopProps) => {
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  // Toggle the visibility of the scroll to top button based on the scroll position
  const toggleScrollToTop = () => {
    if (window.scrollY > 300) {
      setIsScrollToTopVisible(true);
    } else {
      setIsScrollToTopVisible(false);
    }
  };

  // Add an event listener to the window to toggle the visibility of the scroll to top button
  useEffect(() => {
    window.addEventListener("scroll", toggleScrollToTop);

    return () => {
      window.removeEventListener("scroll", toggleScrollToTop);
    };
  }, []);

  return (
    <div className={showMenu ? "hidden fixed bottom-2 left-2" : "fixed bottom-2 left-2"}>
      <Button
        onClick={scrollToTop}
        size="icon"
        className={cn(
          isScrollToTopVisible ? "opacity-100" : "opacity-0",
          "items-center text-light-primary transition-opacity"
        )}
      >
        <ArrowUpFromLine className="h-6 w-6" aria-hidden="true" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
