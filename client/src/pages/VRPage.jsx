import React, {useState, useEffect} from "react";
import {Unity, useUnityContext} from "react-unity-webgl";

const VRPage = () => {
  // const handleClick = () => {
  //   // Open Unity WebGL game's index.html file directly
  // };

  const {unityContext} = useUnityContext ({
    loaderUrl: "/Build/vrtest2.loader.js",
    dataUrl: "/Build/vrtest2.data",
    frameworkUrl: "/Build/vrtest2.framework.js",
    codeUrl: "/Build/vrtest2.wasm"
  });

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(function () {
    unityContext.on("loaded", function() {
      setIsLoaded(true)
    });
  }, []);

  const content = (

    // <object id="UnityObject" classid="clsid:444785F1-DE89-4295-863A-D46C3A781394"
    // width="420" height="750"
    // codebase="http://webplayer.unity3d.com/download_webplayer/UnityWebPlayer.cab#version=2022.3.22f1">
    // <param name="unity3d" value="WebPlayer.unity3d" />
    // <embed id="UnityEmbed" src="TemplateData.unity3d" width="420" height="750"
    // type="application/vnd.unity" pluginspage="http://www.unity3d.com/unity-web-player-2.x" />
    // </object>

    // <div className="h-screen bg-dark-primary flex items-center justify-center">
    //   <button
    //     className="bg-green-primary text-light-primary font-Audiowide font-semibold text-2xl px-4 py-2 rounded-lg hover:bg-green-secondary"
    //     onClick={handleClick}
    //   >
    //     Click Me
    //   </button>
    // </div> 
    <Unity unityProvider={unityContext} style={{visibility: isLoaded ? "visible": "hidden"}}/>

  );

  return content;
};

export default VRPage;