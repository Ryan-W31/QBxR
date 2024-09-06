import { Settings, User } from "lucide-react";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// ProfileDropdown component. This component displays the profile dropdown for the application.
const ProfileDropdown = () => {
  const [logOut, { isLoading }] = useLogoutMutation();
  const { toast } = useToast();

  const navigate = useNavigate();

  // Handle the logout event. If the user is logged out, display a success message and navigate to the login page
  const handleLogout = async () => {
    try {
      await logOut();
      toast({
        variant: "destructive",
        description: "You have successfully logged out.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occurred while logging out. Please try again.",
      });
    }
  };

  // If the user is logging out, display a loading message
  if (isLoading) return <div>Logging out...</div>;

  // Return the profile dropdown menu
  return (
    <div className="hidden lg:block">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex w-[120px] items-center justify-end">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground bg-primary hover:bg-primary-hover">
              <User size={24} />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 gap-y-2 bg-background-secondary p-0 font-semibold uppercase">
          <DropdownMenuItem
            onSelect={() => navigate("/profile")}
            className="flex w-full items-center gap-2 rounded-b-none hover:!bg-primary"
          >
            <User size={24} className="text-foreground" />

            <span className="font-Audiowide text-base text-foreground">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate("/settings")}
            className="flex w-full items-center gap-2 rounded-none hover:!bg-primary"
          >
            <Settings size={24} className="text-foreground" />

            <span className="font-Audiowide text-base text-foreground">Settings</span>
          </DropdownMenuItem>
          <hr className="border-light-primary" />
          <DropdownMenuItem
            onSelect={handleLogout}
            className="flex w-full items-center gap-2 rounded-t-none hover:!bg-red-600"
          >
            <LogOut size={24} className="text-foreground" />

            <span className="font-Audiowide text-base text-foreground">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
