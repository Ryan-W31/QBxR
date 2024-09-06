import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import { useSetWebScoreMutation } from "../hooks/scores/scoreApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";

// WebPage component. This component displays the Web test page with the Unity WebGL build.
const WebPage = () => {
  const [showError, setShowError] = useState(false);
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentId);
  const { unityProvider } = useUnityContext({
    loaderUrl: "./Build/vrtest2.loader.js",
    dataUrl: "./Build/vrtest2.data",
    frameworkUrl: "./Build/vrtest2.framework.js",
    codeUrl: "./Build/vrtest2.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const [updateWebScore] = useSetWebScoreMutation();

  // Handle the form submit event. Update the Web test scores and refresh the user data.
  const handleSubmit = async () => {
    const webScore1: number = parseFloat((document.getElementById("webscore1") as HTMLInputElement)?.value);
    const webScore2: number = parseFloat((document.getElementById("webscore2") as HTMLInputElement)?.value);
    const webScore3: number = parseFloat((document.getElementById("webscore3") as HTMLInputElement)?.value);
    const webScore4: number = parseFloat((document.getElementById("webscore4") as HTMLInputElement)?.value);

    var obj = {
      userId: userId,
      webScore1: webScore1,
      webScore2: webScore2,
      webScore3: webScore3,
      webScore4: webScore4,
    };

    try {
      await updateWebScore(obj).unwrap();
      navigate("/profile");
    } catch (error) {
      setShowError(true);
      setCustomError("An error occurred. Please try again later.");
    }
  };

  // Return the WebPage component
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 md:space-x-16">
      <Unity unityProvider={unityProvider} style={{ width: "960px", height: "600px" }} />

      <img src="./vite.svg" />
      <div className="text-center">
        <p className="text-foreground font-Audiowide uppercase">Input Web Test Values 0-100 (Development Only)</p>
        <form className="text-foreground space-x-8 font-Audiowide uppercase">
          <label htmlFor="webscore1">
            <input
              type="number"
              id="webscore1"
              name="webscore1"
              min="0"
              max="100"
              step="10"
              placeholder="0"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            Web Score 1
          </label>
          <label htmlFor="webscore2">
            <input
              type="number"
              id="webscore2"
              name="webscore2"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            Web Score 2
          </label>
          <label htmlFor="webscore3">
            <input
              type="number"
              id="webscore3"
              name="webscore3"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            Web Score 3
          </label>
          <label htmlFor="webscore4">
            <input
              type="number"
              id="webscore4"
              name="webscore4"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            Web Score 4
          </label>
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
      {showError && <ErrorMessage message={customError} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default WebPage;
