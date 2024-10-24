import { Unity, useUnityContext } from "react-unity-webgl";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
// import { useSelector } from "react-redux";
// import { selectCurrentId } from "../hooks/auth/authSlice";

// WebTestPage component. This component displays the web test page with the Unity WebGL build.
const WebTestPage = () => {
  //const id = useSelector(selectCurrentId);
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
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

  // useEffect(() => {
  //   // Ensure the ID is sent to Unity after it is loaded
  //   if (isLoaded && id) {
  //     sendMessage("QuizManager", "SetUserId", id);
  //   }
  // }, [isLoaded, id, sendMessage]);

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
