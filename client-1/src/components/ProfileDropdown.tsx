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
      toast({ variant: "destructive", description: "You have successfully logged out." });
      navigate("/login");
    } catch (error) {
      toast({ variant: "destructive", description: "An error occurred while logging out. Please try again." });
    }
  };

  // If the user is logging out, display a loading message
  if (isLoading) return <div>Logging out...</div>;

  // Return the profile dropdown menu
  return (
    <div className="hidden lg:block">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-[120px] flex items-center justify-end">
            <div className="flex items-center justify-center h-9 w-9 bg-primary hover:bg-primary-hover rounded-full border-2 border-foreground">
              <User size={24} />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 bg-background-secondary gap-y-2 w-48 uppercase font-semibold">
          <DropdownMenuItem
            onSelect={() => navigate("/profile")}
            className="flex items-center gap-2 rounded-b-none hover:!bg-primary w-full"
          >
            <User size={24} className="text-foreground" />

            <span className="text-foreground font-Audiowide text-base">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate("/settings")}
            className="flex items-center gap-2 rounded-none hover:!bg-primary w-full"
          >
            <Settings size={24} className="text-foreground" />

            <span className="text-foreground font-Audiowide text-base">Settings</span>
          </DropdownMenuItem>
          <hr className="border-light-primary" />
          <DropdownMenuItem
            onSelect={handleLogout}
            className="flex items-center gap-2 rounded-t-none hover:!bg-red-600 w-full"
          >
            <LogOut size={24} className="text-foreground" />

            <span className="text-foreground font-Audiowide text-base">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
