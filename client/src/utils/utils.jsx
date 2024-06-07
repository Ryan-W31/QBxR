// Utility functions for the app
import { differenceInYears } from "date-fns";
import { useCallback, useEffect } from "react";
// Function to combine multiple classes into one
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Function to scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Function to style the current page in the navigation bar
function currentPageStyle(navBarItem, currentPage, option1, option2) {
  if (navBarItem === currentPage) {
    return option1;
  } else {
    return option2;
  }
}

// Function to get the initials of a name
function getInitials(name) {
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
}

// Function to calculate age from date of birth
function getAge(dob) {
  const date = new Date(dob);
  const age = differenceInYears(new Date(), date);
  return age;
}

// Function to format the birthday date
const formatBirthday = (date) => {
  if (!date) return "";
  const d = date.substring(0, 10);
  return d;
};

// Function to determine the color of the score based on the value
function scoreColor(scoreColor) {
  if (scoreColor < 50) {
    return "text-red-500";
  } else if (scoreColor < 70) {
    return "text-yellow-600";
  } else {
    return "text-green-primary";
  }
}

// Function to determine the color of the score bar based on the value
function barColor(scoreColor) {
  if (scoreColor < 50) {
    return "bg-red-500";
  } else if (scoreColor < 70) {
    return "bg-yellow-600";
  } else {
    return "bg-green-primary";
  }
}

// Function to color the podium based on the rank
function colorPodium(rank) {
  if (rank === 1) {
    return "bg-[#DBAC34]/80";
  } else if (rank === 2) {
    return "bg-[#A5A9B4]/80";
  } else if (rank === 3) {
    return "bg-[#CD7F32]/80";
  } else {
    return "bg-dark-secondary";
  }
}

// Function to check if the user has taken the Web and VR tests
function checkData(webData, vrData) {
  if (
    (webData === undefined || webData?.length === 0) &&
    (vrData === undefined || vrData?.length === 0)
  ) {
    return (
      <p className="text-xl font-Audiowide text-light-primary">
        Take the Web and VR Tests
      </p>
    );
  } else if (webData === undefined || webData?.length === 0) {
    return (
      <p className="text-xl font-Audiowide text-light-primary">
        Take the Web Test
      </p>
    );
  } else {
    return (
      <p className="text-xl font-Audiowide text-light-primary">
        Take the VR Test
      </p>
    );
  }
}

function useDebounce(effect, dependencies, delay) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export {
  classNames,
  scrollToTop,
  currentPageStyle,
  getInitials,
  getAge,
  formatBirthday,
  scoreColor,
  barColor,
  colorPodium,
  checkData,
  useDebounce,
};
