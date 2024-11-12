import { Unity, useUnityContext } from "react-unity-webgl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useSetWebScoreMutation } from "@/hooks/scores/scoreApiSlice";

// WebTestPage component. This component displays the web test page with the Unity WebGL build.
const WebTestPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [defensiveReadScore, setDefensiveReadScore] = useState(0);
  const [playRecognitionScore, setPlayRecognitionScore] = useState(0);
  const hasSubmitted = useRef(false);

  const userId = useSelector(selectCurrentId);
  const navigate = useNavigate();

  const { unityProvider, isLoaded, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "/2dBuild/2dBuild.loader.js",
    dataUrl: "/2dBuild/2dBuild.data",
    frameworkUrl: "/2dBuild/2dBuild.framework.js",
    codeUrl: "/2dBuild/2dBuild.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  // React function to navigate to a different page
  const navigateToProfile = useCallback(() => {
    navigate("/profile"); // Use react-router to navigate to a different page
  }, []);

  const [updateWebScore] = useSetWebScoreMutation();

  const handleScoreChange = useCallback(
    (newScore: any, defensiveReadScore: any, playRecognitionScore: any, isComplete: any) => {
      setScore(newScore);
      setDefensiveReadScore(defensiveReadScore);
      setPlayRecognitionScore(playRecognitionScore);
      setIsComplete(isComplete);
    },
    [setScore]
  );

  // Handle the form submit event. Update the VR test scores and refresh the user data.
  const submitScore = async () => {
    const webScore1: number = score * 10;
    const webScore2: number = (defensiveReadScore / 6) * 100;
    const webScore3: number = (playRecognitionScore / 4) * 100;

    var obj = {
      userId: userId,
      webScore1: webScore1,
      webScore2: webScore2,
      webScore3: webScore3,
    };

    try {
      await updateWebScore(obj).unwrap();
    } catch (error) {
      console.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (isComplete && !hasSubmitted.current) {
      submitScore();
      hasSubmitted.current = true;
    }
  }, [isComplete, submitScore, hasSubmitted]);

  useEffect(() => {
    if (isLoaded && isLoaded) {
      // Add the external event listener for the navigation call from Unity
      addEventListener("sendScore", handleScoreChange);

      // Cleanup the event listener when the component unmounts
      return () => {
        removeEventListener("sendScore", handleScoreChange);
      };
    }
  }, [isLoaded, addEventListener, removeEventListener, handleScoreChange]);

  useEffect(() => {
    // Add the external event listener for the navigation call from Unity
    addEventListener("navigateToProfile", navigateToProfile);

    // Cleanup the event listener when the component unmounts
    return () => {
      removeEventListener("navigateToProfile", navigateToProfile);
    };
  }, [addEventListener, removeEventListener, navigateToProfile]);

  // Return the WebTestPage component
  return (
    <div className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Unity unityProvider={unityProvider} style={{ width: "960px", height: "600px" }} />
    </div>
  );
};

export default WebTestPage;
