import React from "react";

const VRPage = () => {
  const handleClick = () => {
    // Code or script executes from here
  };
  const content = (
    <div className="h-screen bg-dark-primary flex items-center justify-center">
      <button
        className="bg-green-primary text-light-primary font-Audiowide font-semibold text-2xl px-4 py-2 rounded-lg hover:bg-green-secondary"
        onClick={handleClick}
      >
        Click Me
      </button>
    </div>
  );

  return content;
};

export default VRPage;
