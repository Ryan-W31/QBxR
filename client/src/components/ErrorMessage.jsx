import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div
      className="flex flex-row justify-stretch bg-red-600 border border-red-400 text-light-primary w-full px-4 py-2 rounded relative mb-4"
      role="alert"
    >
      <span className="">{message}</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4"
        onClick={onClose}
      >
        <AiOutlineClose className="text-light-primary" />
        <title>Close</title>
      </button>
    </div>
  );
};

export default ErrorMessage;
