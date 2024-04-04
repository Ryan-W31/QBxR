const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export { classNames, scrollToTop };
