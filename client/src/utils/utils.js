import { differenceInYears } from "date-fns";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function currentPageStyle(navBarItem, currentPage, option1, option2) {
  if (navBarItem === currentPage) {
    return option1;
  } else {
    return option2;
  }
}

function getInitials(name) {
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
}

function getAge(dob) {
  const date = new Date(dob);
  const age = differenceInYears(new Date(), date);
  return age;
}

function scoreColor(scoreColor) {
  if (scoreColor < 50) {
    return "text-red-500";
  } else if (scoreColor < 70) {
    return "text-yellow-600";
  } else {
    return "text-green-primary";
  }
}

function barColor(scoreColor) {
  if (scoreColor < 50) {
    return "bg-red-500";
  } else if (scoreColor < 70) {
    return "bg-yellow-600";
  } else {
    return "bg-green-primary";
  }
}

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

export {
  classNames,
  scrollToTop,
  currentPageStyle,
  getInitials,
  getAge,
  scoreColor,
  barColor,
  checkData,
};
