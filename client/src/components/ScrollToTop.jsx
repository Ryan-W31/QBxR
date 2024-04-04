import React, { useState, useEffect } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { classNames, scrollToTop } from "../utils/utils";

const ScrollToTop = ({ showMenu }) => {
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  const toggleScrollToTop = () => {
    if (window.scrollY > 300) {
      setIsScrollToTopVisible(true);
    } else {
      setIsScrollToTopVisible(false);
    }
  };

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
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          isScrollToTopVisible ? "opacity-100" : "opacity-0",
          "bg-green-primary hover:bg-green-secondary inline-flex items-center rounded-full p-3 text-light-primary transition-opacity"
        )}
      >
        <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ScrollToTop;
