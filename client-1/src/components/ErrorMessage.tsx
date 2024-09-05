import { X } from "lucide-react";
import { Button } from "./ui/button";

// ErrorMessage component. This component displays an error message with a close button.
type ErrorMessageProps = {
  message: string;
  onClose: () => void;
};
const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  // If the message is empty, return null
  return (
    <div
      className="relative mb-4 flex w-full flex-row items-center justify-between rounded border border-red-400 bg-red-600 px-4 py-2 text-foreground"
      role="alert"
    >
      {/* Error message */}
      <span className="md:text-md text-sm">{message}</span>
      {/* End Error message */}

      {/* Close button */}
      <Button variant="ghost" size="icon" className="bg-transparent shadow-none hover:bg-transparent" onClick={onClose}>
        <X size={24} className="text-foreground" />
      </Button>
      {/* End Close button */}
    </div>
  );
};

export default ErrorMessage;
