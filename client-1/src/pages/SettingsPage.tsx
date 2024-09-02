import { useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../hooks/auth/authApiSlice";
import { useUpdateUserPasswordMutation, useDeleteUserMutation } from "../hooks/users/userApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type CustomError = {
  status: number;
  data: {
    message: string;
  };
};

const SettingsPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const myId = useSelector(selectCurrentId);
  const [updatePassword, { isLoading: isLoadingPassword }] = useUpdateUserPasswordMutation();
  const [deleteUser, { isLoading: isLoadingDeleteUser }] = useDeleteUserMutation();
  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation();

  const toggleBlur = () => setShowBlur((prevState) => !prevState);
  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  const openPasswordPopup = () => {
    setShowPasswordPopup(true);
    toggleBlur();
  };

  const openDeletePopup = () => {
    setShowDeletePopup(true);
    toggleBlur();
  };

  const handleClose = () => {
    setShowPasswordPopup(false);
    setShowDeletePopup(false);
    toggleBlur();
  };

  const handleDeleteUser = useCallback(
    async (event: Event) => {
      event.preventDefault();
      if (deleteMessage !== "DELETE") {
        setIsError(true);
        setError("Please type 'DELETE' in the box to confirm deletion.");
        return;
      }
      deleteUser(myId);
      logout();

      if (!isLoadingLogout && !isLoadingDeleteUser) {
        toast({ description: "Your account was deleted successfully." });
        navigate("/login");
      }
    },
    [logout, isLoadingLogout, isLoadingDeleteUser, navigate, toast, deleteUser, myId, deleteMessage]
  );

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      await updatePassword({
        userId: myId,
        newPassword: data.password,
      });

      handleClose();
    } catch (error) {
      setIsError(true);
      const err = error as CustomError;
      if (!err.status || !err.data) setError("Error changing password. Please try again later.");
      else setError(err.data.message);
    }
  };

  return (
    <div>
      <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />

      <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
        <ScrollToTop showMenu={showMenu} />
        <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />
        <section className="fade-in flex justify-center items-center mt-10 p-5">
          <Card className="md:w-1/3 min-w-96 max-w-lg bg-dark-secondary/80 rounded-lg h-full">
            <CardHeader className="mt-4 bg-transparent shadow-none">
              <h1 className="text-6xl font-bold font-Audiowide text-green-primary text-center">Settings</h1>
            </CardHeader>
            <CardContent className="bg-transparent text-center">
              <ul className="bg-dark-secondary text-light-secondary py-2 px-3 mt-3 divide-y rounded border-2 border-green-primary">
                <li className="flex items-center py-3">
                  <span className="font-Audiowide text-light-secondary">Change Your Password:</span>
                  <span className="ml-auto">
                    <Button
                      className="px-6 py-2 rounded-full bg-green-primary hover:bg-green-secondary text-light-primary font-Audiowide text-md"
                      onClick={openPasswordPopup}
                    >
                      Change
                    </Button>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-Audiowide text-light-secondary">Delete Your Account:</span>
                  <span className="ml-auto">
                    <Button
                      className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-800 text-light-primary font-Audiowide text-md"
                      onClick={openDeletePopup}
                    >
                      Delete
                    </Button>
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
      {showPasswordPopup && (
        <div
          id="update-password-popup"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <Card className="fade-in relative p-4 w-full h-full md:h-auto font-Audiowide max-w-xl !bg-dark-secondary rounded-lg sm:p-5">
            {/* Modal Header */}
            <div className="flex justify-center items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <CardHeader className="text-lg font-semibold text-light-primary bg-transparent shadow-none mt-0">
                Change Password
              </CardHeader>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-2 hover:bg-transparent"
                onClick={handleClose}
              >
                <X className="text-3xl" />
              </Button>
            </div>
            {/* End Modal Header */}
            {isError && <ErrorMessage message={error} onClose={() => setIsError(false)} />}
            {/* Modal Body */}
            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)}>
                <FormField
                  control={resetPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Password</FormLabel>
                      <FormControl className="!mt-0">
                        <div className="relative">
                          <Input
                            {...field}
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Password"
                            className="bg-foreground text-background focus:border-primary focus:border-2"
                            required
                          />
                          <Button
                            variant="ghost"
                            type="button"
                            size="icon"
                            className="absolute top-0 right-0 shadow-none hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                          >
                            {isPasswordVisible ? (
                              <Eye size={24} className="text-background" />
                            ) : (
                              <EyeOff size={24} className="text-background" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl className="!mt-0">
                        <div className="relative">
                          <Input
                            {...field}
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            placeholder="Password"
                            className="bg-foreground text-background focus:border-primary focus:border-2"
                            required
                          />
                          <Button
                            variant="ghost"
                            type="button"
                            size="icon"
                            className="absolute top-0 right-0 shadow-none hover:bg-transparent"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {isConfirmPasswordVisible ? (
                              <Eye size={24} className="text-background" />
                            ) : (
                              <EyeOff size={24} className="text-background" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="font-Audiowide rounded-full tracking-wider"
                    disabled={isLoadingPassword}
                  >
                    {isLoadingPassword ? (
                      <>
                        <Loader2 size={24} className="mr-2 animate-spin" /> Changing Password...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            {/* End Modal Body */}
          </Card>
        </div>
      )}
      {showDeletePopup && (
        <div
          id="delete-user-popup"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <Card className="fade-in relative p-4 w-full h-full md:h-auto font-Audiowide max-w-xl !bg-dark-secondary rounded-lg sm:p-5">
            {/* Modal Header */}
            <div className="flex justify-center items-center pb-4 rounded-t border-b">
              <CardHeader className="text-lg font-semibold text-light-primary bg-transparent shadow-none mt-0">
                Delete Your Account
              </CardHeader>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-2 hover:bg-transparent"
                onClick={handleClose}
              >
                <X className="text-3xl" />
              </Button>
            </div>
            {/* End Modal Header */}
            {isError && (
              <>
                <div className="mt-2" />
                <ErrorMessage message={error} onClose={() => setIsError(false)} />
              </>
            )}
            {/* Modal Body */}
            <CardContent className="bg-transparent flex flex-col pt-2">
              {/* Confirm Field */}
              <p className="text-sm font-Audiowide text-light-primary">
                By deleting your account, all of your information, including your test scores, will be erased. If you
                would like to proceed in deleting your account, type 'DELETE' (all uppercase) in the box below then
                click the 'Delete' button.
              </p>
              <div className="my-2" />
              <Input
                type="text"
                placeholder="Type 'DELETE' to confirm"
                className="bg-foreground text-background focus:border-primary focus:border-2"
                onChange={(e) => setDeleteMessage(e.target.value)}
                required
              />
              <div className="my-2" />

              {/* End Confirm Field */}
              <div className="flex justify-center">
                <Button variant="destructive" size="lg" onClick={() => handleDeleteUser}>
                  Delete
                </Button>
              </div>
            </CardContent>
            {/* End Modal Body */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
