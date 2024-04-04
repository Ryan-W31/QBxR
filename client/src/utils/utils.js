const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    return (
      "http://qbxr-env.eba-mzjrqevn.us-east-1.elasticbeanstalk.com/" + route
    );
  } else {
    return "http://localhost:5000/" + route;
  }
}

export { classNames, scrollToTop, buildPath };
