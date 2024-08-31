import { useCallback } from "react";
import { Settings, User } from "lucide-react";
import { selectCurrentUser } from "../hooks/auth/authSlice";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import usePersist from "../hooks/auth/usePersist";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
// ProfileDropdown component. This component displays the profile dropdown for the application.
const ProfileDropdown = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const [persist, setPersist] = usePersist();
  const { toast } = useToast();

  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  // Handle the logout event. If the user is logged out, display a success message and navigate to the login page
  const handleLogout = useCallback(
    (event: Event) => {
      event.preventDefault();
      if (persist) setPersist(false);
      logout();

      if (!isLoading) {
        toast({ variant: "destructive", description: "You have successfully logged out." });
        navigate("/login");
      }
    },
    [logout, isLoading, setPersist, persist, navigate, toast]
  );

  // If the user is logging out, display a loading message
  if (isLoading) return <div>Logging out...</div>;

  // Return the profile dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="flex bg-transparent items-center gap-4 px-0">
          <div className="flex items-center justify-center h-9 w-9 bg-green-primary rounded-full border-2 border-light-primary hover:bg-green-secondary">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="font-Audiowide text-[0.5rem] text-light-primary text-left">{`${user?.firstname}`}</p>
            <p className="font-Audiowide text-[0.5rem] text-light-primary text-left">{`${user?.lastname}`}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 bg-dark-secondary gap-y-2">
        <DropdownMenuItem
          onSelect={() => navigate("/profile")}
          className="flex items-center gap-2 rounded-b-none hover:!bg-green-primary w-full"
        >
          <User className="h-4 w-4 text-light-primary" />

          <span className="text-light-primary font-Audiowide text-md">My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => navigate("/settings")}
          className="flex items-center gap-2 rounded-none hover:!bg-green-primary w-full"
        >
          <Settings className="h-4 w-4 text-light-primary" />

          <span className="text-light-primary font-Audiowide text-md">Settings</span>
        </DropdownMenuItem>
        <hr className="border-light-primary" />
        <DropdownMenuItem
          onSelect={handleLogout}
          className="flex items-center gap-2 rounded-t-none hover:!bg-red-600 w-full"
        >
          <LogOut className="h-4 w-4 text-light-primary" />

          <span className="text-light-primary font-Audiowide text-md">Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
