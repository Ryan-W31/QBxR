import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "@material-tailwind/react";

// ErrorMessage component. This component displays an error message with a close button.
const ErrorMessage = ({ message, onClose }) => {
  // If the message is empty, return null
  return (
    <div
      className="flex flex-row justify-stretch bg-red-600 border border-red-400 text-light-primary w-full px-4 py-2 rounded relative mb-4 font-Audiowide"
      role="alert"
    >
      {/* Error message */}
      <span className="text-sm md:text-md">{message}</span>
      {/* End Error message */}

      {/* Close button */}
      <IconButton
        type="text"
        ripple={false}
        className="absolute top-0 bottom-0 right-0 px-4 bg-transparent shadow-none hover:shadow-none"
        onClick={onClose}
      >
        <AiOutlineClose className="text-light-primary" />
        <title>Close</title>
      </IconButton>
      {/* End Close button */}
    </div>
  );
};

export default ErrorMessage;
