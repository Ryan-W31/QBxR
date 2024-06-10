import React, { useState, useEffect } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { classNames, scrollToTop } from "../utils/utils";
import { IconButton } from "@material-tailwind/react";

// ScrollToTop component. This component displays a button that scrolls to the top of the page when clicked.
const ScrollToTop = ({ showMenu }) => {
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
    <div
      className={
        showMenu ? "hidden fixed bottom-2 left-2" : "fixed bottom-2 left-2"
      }
    >
      <IconButton
        onClick={scrollToTop}
        className={classNames(
          isScrollToTopVisible ? "opacity-100" : "opacity-0",
          "bg-green-primary hover:bg-green-secondary inline-flex items-center rounded-full p-3 text-light-primary transition-opacity"
        )}
      >
        <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
      </IconButton>
    </div>
  );
};

export default ScrollToTop;
