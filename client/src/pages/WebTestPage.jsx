import { Unity, useUnityContext } from "react-unity-webgl";

const WebTestPage = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/vrtest2.loader.js",
    dataUrl: "/Build/vrtest2.data",
    frameworkUrl: "/Build/vrtest2.framework.js",
    codeUrl: "/Build/vrtest2.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  return (
    <div className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Unity
        unityProvider={unityProvider}
        style={{ width: "960px", height: "600px" }}
      />
    </div>
  );
};

export default WebTestPage;