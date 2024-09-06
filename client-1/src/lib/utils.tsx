import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInYears } from "date-fns";
import { useCallback, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to scroll to the top of the page
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Function to style the current page in the navigation bar
export function currentPageStyle(navBarItem: string, currentPage: string, option1: string, option2: string) {
  if (navBarItem === currentPage) {
    return option1;
  } else {
    return option2;
  }
}

// Function to get the initials of a name
export function getInitials(name: string) {
  const initials = name.match(/\b\w/g) || [];
  const nameInitials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return nameInitials;
}

//Function to calculate age from date of birth
export function getAge(dob: Date) {
  const age = differenceInYears(new Date(), dob);
  return age;
}

// Function to determine the color of the score based on the value
export function scoreColor(scoreColor: number) {
  if (scoreColor < 50) {
    return "text-red-500";
  } else if (scoreColor < 70) {
    return "text-yellow-600";
  } else {
    return "text-primary";
  }
}

// Function to determine the color of the score bar based on the value
export function dotColor(scoreColor: number) {
  if (scoreColor < 50) {
    return "rgb(239 68 68)";
  } else if (scoreColor < 70) {
    return "rgb(202 138 4)";
  } else {
    return "hsl(var(--primary))";
  }
}

// Function to color the podium based on the rank
export function colorPodium(rank: number) {
  if (rank === 1) {
    return "bg-[#DBAC34]/80";
  } else if (rank === 2) {
    return "bg-[#A5A9B4]/80";
  } else if (rank === 3) {
    return "bg-[#CD7F32]/80";
  } else {
    return "bg-background-secondary";
  }
}

// Function to check if the user has taken the Web and VR tests
export function checkData(
  webData: { title: string; score: number }[] | undefined,
  vrData: { title: string; score: number }[] | undefined
) {
  if ((webData === undefined || webData?.length === 0) && (vrData === undefined || vrData?.length === 0)) {
    return <p className="text-base md:text-xl font-Audiowide text-foreground">Take the Web and VR Tests</p>;
  } else if (webData === undefined || webData?.length === 0) {
    return <p className="text-base md:text-xl font-Audiowide text-foreground">Take the Web Test</p>;
  } else {
    return <p className="text-base md:text-xl font-Audiowide text-foreground">Take the VR Test</p>;
  }
}

export function useDebounce(effect: any, dependencies: string[], delay: number) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export function strengthColor(score: number) {
  if (score < 2) {
    return "bg-red-500";
  } else if (score < 3) {
    return "bg-yellow-600";
  } else {
    return "bg-primary";
  }
}
