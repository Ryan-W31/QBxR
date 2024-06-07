import React, { createContext, useContext, useRef } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ToastContext and useToast hook
const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

// ToastProvider component
export const ToastProvider = ({ children }) => {
  const toastRef = useRef();

  // notify function to display a toast notification
  const notify = (message, type = "info", position = "top-right") => {
    const toastTypes = {
      info: { type: toast.info, className: "#3182CE" },
      success: { type: toast.success, className: "#1FB622" },
      warn: { type: toast.warn, className: "#D69E2E" },
      error: { type: toast.error, className: "#E53E3E" },
    };

    const { type: notifyToast, className } =
      toastTypes[type] || toastTypes.info;

    notifyToast(message, {
      style: { backgroundColor: className },
      bodyClassName: `text-light-primary font-Audiowide font-semibold`,
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  // Return the ToastContext.Provider with the notify function and the ToastContainer
  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <ToastContainer
        ref={toastRef}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ToastContext.Provider>
  );
};
