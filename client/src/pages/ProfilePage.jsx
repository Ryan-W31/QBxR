import React from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [showMenu, setShowMenu] = useState(false);

  function checkData() {
    if (webData === null && vrData === null) {
      return <p className="text-xl">Take the Web and VR Tests</p>;
    } else if (webData === null) {
      return <p className="text-xl">Take the Web Test</p>;
    } else {
      return <p className="text-xl">Take the VR Test</p>;
    }
  }

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const webData = [
    { title: "Reaction Test", score: 35 },
    { title: "Play Identification", score: 55 },
    { title: "Defense Reading", score: 75 },
    { title: "Critical Thinking", score: 95 },
  ];
  const vrData = [
    { title: "Reaction Test", score: 35 },
    { title: "Play Identification", score: 55 },
    { title: "Defense Reading", score: 75 },
    { title: "Critical Thinking", score: 95 },
  ];

  // const webData = null;
  // const vrData = null;

  const content = (
    <div>
      <ScrollToTop showMenu={showMenu} />
      <NavBar
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="profile"
      />
      <MobileMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isLandingPage={false}
        currentPage="profile"
      />

      <div className={showMenu ? "blur-lg pointer-events-none" : ""}>
        <div class="mx-auto flex flex-col md:flex-row my-5 p-5">
          <div class="md:w-1/3 w-full flex-col bg-dark-secondary/80 p-3 border-t-4 border-green-primary rounded-lg text-center font-Audiowide">
            <div class="image overflow-hidden p-3">
              <div className="h-60 w-60 text-light-primary bg-green-primary border border-light-primary rounded-full inline-flex items-center justify-center text-md md:text-4xl">
                JD
              </div>
            </div>
            <h1 class="text-light-primary font-bold text-xl leading-8 my-1">
              John Doe
            </h1>
            <h3 class="text-light-secondary font-lg text-semibold leading-6">
              University of Central Florida
            </h3>
            <p class="text-sm text-light-secondary leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
              non deserunt
            </p>
            <ul class="bg-dark-secondary text-light-secondary py-2 px-3 mt-3 divide-y rounded border-2 border-green-primary">
              <li class="flex items-center py-3">
                <span>Status</span>
                <span class="ml-auto">
                  <span class="bg-green-primary py-1 px-2 rounded text-light-primary text-sm">
                    Active
                  </span>
                </span>
              </li>
              <li class="flex items-center py-3">
                <span>Age</span>
                <span class="ml-auto">21 years old</span>
              </li>
            </ul>
            <div class="my-4"></div>
          </div>
          <div class="w-full md:w-9/12 my-4 md:my-0 md:mx-2 border-t-4 border-green-primary">
            <div class="bg-dark-secondary/80 p-3 rounded-lg font-Audiowide">
              <div class="flex justify-center text-center space-x-2 font-semibold text-light-primary">
                <span class="tracking-wide text-3xl">About</span>
              </div>
              <div class="text-light-secondary">
                <div class="grid md:grid-cols-2 text-lg">
                  <div class="grid grid-cols-2">
                    <div class="px-2 py-2 font-semibold">Name</div>
                    <div class="px-2 py-2">John Doe</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-2 py-2 font-semibold">Email</div>
                    <a
                      class=" px-2 py-2 text-blue-800"
                      href="mailto:johndoe@email.com"
                    >
                      johndoe@email.com
                    </a>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-2 py-2 font-semibold">Phone No.</div>
                    <div class="px-2 py-2">+1 (222) 333-4444</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-2 py-2 font-semibold">Birthday</div>
                    <div class="px-2 py-2">January 01, 2003</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="my-4"></div>

            <div className="bg-dark-secondary/80 p-4 rounded-lg border-t-4 border-green-primary">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-light-primary font-Audiowide m-2">
                  Your QBxR Score
                </h1>
                {webData !== null && vrData !== null ? (
                  <p className="text-5xl font-bold text-green-primary font-Audiowide m-2">
                    75
                  </p>
                ) : (
                  <p className="text-3xl font-bold text-light-primary font-Audiowide m-2">
                    {checkData()}
                  </p>
                )}

                <p className="text-light-secondary font-Audiowide">
                  Your QBxR score is calculated by taking the average of your
                  Web and VR test scores.
                </p>
              </div>
              <div className="flex md:flex-row flex-col justify-evenly md:space-x-4 font-Audiowide">
                <div className="flex flex-col">
                  <ScoreCard
                    title={"Your Web Test Scores"}
                    errMessage={"Take The Web Test"}
                    size="3"
                    data={webData}
                  />
                  {webData === null ? (
                    <Link
                      to="/web"
                      className="py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center"
                    >
                      Take The Web Test
                    </Link>
                  ) : null}
                </div>
                <div class="my-4 md:my-0"></div>
                <div className="flex flex-col">
                  <ScoreCard
                    title={"Your VR Test Scores"}
                    errMessage={"Take The VR Test"}
                    size="3"
                    data={vrData}
                  />
                  {vrData === null ? (
                    <Link
                      to="/vr"
                      className="py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center"
                    >
                      Take The VR Test
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default ProfilePage;