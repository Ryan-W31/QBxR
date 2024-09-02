import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import { useSetWebScoreMutation } from "../hooks/scores/scoreApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";

// WebPage component. This component displays the Web test page with the Unity WebGL build.
const WebPage = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentId);
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/webtest2.loader.js",
    dataUrl: "/Build/webtest2.data",
    frameworkUrl: "/Build/webtest2.framework.js",
    codeUrl: "/Build/webtest2.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const [updateWebScore] = useSetWebScoreMutation();

  // Handle the form submit event. Update the Web test scores and refresh the user data.
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const webScore1 = (document.getElementById("webscore1") as HTMLInputElement)?.value;
    const webScore2 = (document.getElementById("webscore2") as HTMLInputElement)?.value;
    const webScore3 = (document.getElementById("webscore3") as HTMLInputElement)?.value;
    const webScore4 = (document.getElementById("webscore4") as HTMLInputElement)?.value;

    var obj = {
      userId: userId,
      webScore1: webScore1,
      webScore2: webScore2,
      webScore3: webScore3,
      webScore4: webScore4,
    };

    await updateWebScore(obj);
    navigate("/profile");
  };

  // Return the WebPage component
  return (
    <div className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Unity unityProvider={unityProvider} style={{ width: "960px", height: "600px" }} />

      <div className="text-center">
        <p className="text-light-primary font-Audiowide">Input Web Test Values 0-100 (Development Only)</p>
        <form className="text-light-primary font-Audiowide space-x-8">
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
              className="m-2 bg-dark-secondary rounded-lg text-center"
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
              className="m-2 bg-dark-secondary rounded-lg text-center"
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
              className="m-2 bg-dark-secondary rounded-lg text-center"
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
              className="m-2 bg-dark-secondary rounded-lg text-center"
            />
            Web Score 4
          </label>
          <button
            type="button"
            className="bg-green-primary text-light-primary font-Audiowide px-4 py-2 rounded-full hover:bg-green-secondary"
            onClick={() => handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebPage;
