import React from "react";
import { AiOutlineClose } from "react-icons/ai";

// ErrorMessage component. This component displays an error message with a close button.
const ErrorMessage = ({ message, onClose }) => {
  // If the message is empty, return null
  return (
    <div
      className="flex flex-row justify-stretch bg-red-600 border border-red-400 text-light-primary w-full px-4 py-2 rounded relative mb-4"
      role="alert"
    >
      {/* Error message */}
      <span className="">{message}</span>
      {/* End Error message */}

      {/* Close button */}
      <button
        className="absolute top-0 bottom-0 right-0 px-4"
        onClick={onClose}
      >
        <AiOutlineClose className="text-light-primary" />
        <title>Close</title>
      </button>
      {/* End Close button */}
    </div>
  );
};

export default ErrorMessage;
