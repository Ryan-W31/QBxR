import React from "react";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../hooks/users/userApiSlice";
import { useSetVRScoreMutation } from "../hooks/users/scoreApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";

const VRPage = () => {
  const navigate = useNavigate();
  const [setVRScore] = useSetVRScoreMutation();
  const { data: user } = useGetUserByIdQuery(useSelector(selectCurrentId), {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/vrtest2.loader.js",
    dataUrl: "/Build/vrtest2.data",
    frameworkUrl: "/Build/vrtest2.framework.js",
    codeUrl: "/Build/vrtest2.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const vrScore1 = document.getElementById("vrscore1").value;
    const vrScore2 = document.getElementById("vrscore2").value;
    const vrScore3 = document.getElementById("vrscore3").value;
    const vrScore4 = document.getElementById("vrscore4").value;

    var obj = {
      id: user.id,
      vrScore1: vrScore1,
      vrScore2: vrScore2,
      vrScore3: vrScore3,
      vrScore4: vrScore4,
    };

    await setVRScore(obj)
      .then((res) => {
        console.log(res);
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Unity
        unityProvider={unityProvider}
        style={{ width: "960px", height: "600px" }}
      />

      <div className="text-center">
        <p className="text-light-primary font-Audiowide">
          Input VR Test Values 0-100 (Development Only)
        </p>
        <form className="text-light-primary font-Audiowide space-x-8">
          <label for="vrscore1">
            <input
              type="number"
              id="vrscore1"
              name="vrscore1"
              min="0"
              max="100"
              step="10"
              placeholder="0"
              required
              className="m-2 bg-dark-secondary rounded-lg text-center"
            />
            VR Score 1
          </label>
          <label for="vrscore2">
            <input
              type="number"
              id="vrscore2"
              name="vrscore2"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="m-2 bg-dark-secondary rounded-lg text-center"
            />
            VR Score 2
          </label>
          <label for="vrscore3">
            <input
              type="number"
              id="vrscore3"
              name="vrscore3"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="m-2 bg-dark-secondary rounded-lg text-center"
            />
            VR Score 3
          </label>
          <label for="vrscore4">
            <input
              type="number"
              id="vrscore4"
              name="vrscore4"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="m-2 bg-dark-secondary rounded-lg text-center"
            />
            VR Score 4
          </label>
          <button
            type="button"
            className="bg-green-primary text-light-primary font-Audiowide px-4 py-2 rounded-full hover:bg-green-secondary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VRPage;
