import { useState } from "react";
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
import { Eye, EyeOff, Loader2, Trash2, X } from "lucide-react";
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
  const [logout] = useLogoutMutation();

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

  const handleDeleteUser = async () => {
    if (deleteMessage !== "DELETE") {
      setIsError(true);
      setError("Please type 'DELETE' in the box to confirm deletion.");
      return;
    }

    try {
      await deleteUser(myId);
      await logout();

      toast({ description: "Your account was deleted successfully." });
      navigate("/login");
    } catch (error) {
      setIsError(true);
      const err = error as CustomError;
      if (!err.status || !err.data) setError("Error deleting account. Please try again later.");
      else setError(err.data.message);
    }
  };

  const onFormError = (errors: any) => {
    const errorFields = ["password", "confirmPassword"];

    for (const field of errorFields) {
      if (errors[field]) {
        setIsError(true);
        setError(errors[field]?.message || "Failed to change password. Please try again later.");
        break;
      }
    }
  };

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
      if (!err.status || !err.data) setError("Failed to change password. Please try again later.");
      else setError(err.data.message);
    }
  };

  return (
    <div>
      <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />

      <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
        <ScrollToTop showMenu={showMenu} />
        <NavBar showMenu={showMenu} toggleMenu={toggleMenu} isLandingPage={false} currentPage="profile" />
        <section className="flex justify-center items-center mt-10 p-5">
          <Card className="m-6 w-full max-w-lg p-6">
            <CardHeader className="mt-4 bg-transparent shadow-none">
              <h1 className="text-6xl font-bold font-Audiowide text-primary text-center uppercase">Settings</h1>
            </CardHeader>
            <CardContent className="bg-transparent text-center">
              <ul className="bg-background-secondary text-foreground-secondary py-2 px-3 mt-3 divide-y rounded border-2 border-primary">
                <li className="flex items-center justify-between py-3">
                  <span className="font-Audiowide text-foreground-secondary uppercase">Change Your Password:</span>
                  <Button onClick={openPasswordPopup}>Change</Button>
                </li>
                <li className="flex items-center justify-between py-3">
                  <span className="font-Audiowide text-foreground-secondary uppercase">Delete Your Account:</span>
                  <div className="flex items-center justify-center">
                    <Button variant="destructive" onClick={openDeletePopup}>
                      <Trash2 size={24} className="mr-2" />
                      Delete
                    </Button>
                  </div>
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
          <Card className="relative p-4 w-full h-full md:h-auto max-w-xl bg-background-secondary rounded-lg sm:p-5">
            {/* Modal Header */}
            <div className="flex justify-center items-center rounded-t border-b">
              <CardHeader className="pt-2 text-3xl font-semibold text-foreground bg-transparent shadow-none mt-0 font-Audiowide uppercase">
                Change Password
              </CardHeader>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-2 hover:bg-transparent"
                onClick={handleClose}
              >
                <X className="text-3xl text-primary hover:text-primary-hover" />
              </Button>
            </div>
            {/* End Modal Header */}
            {isError && <ErrorMessage message={error} onClose={() => setIsError(false)} />}
            {/* Modal Body */}
            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(onSubmit, onFormError)}>
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
          <Card className=" relative p-4 w-full h-full md:h-auto max-w-xl bg-background-secondary rounded-lg sm:p-5">
            {/* Modal Header */}
            <div className="flex justify-center items-center rounded-t border-b">
              <CardHeader className="pt-2 text-3xl font-semibold text-foreground bg-transparent shadow-none mt-0 font-Audiowide uppercase">
                Delete Your Account
              </CardHeader>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-2 hover:bg-transparent"
                onClick={handleClose}
              >
                <X className="text-3xl text-primary hover:text-primary-hover" />
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
              <p className="text-sm text-foreground text-center">
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
              <div className="flex items-center justify-center">
                <Button disabled={isLoadingDeleteUser} variant="destructive" onClick={handleDeleteUser}>
                  {isLoadingDeleteUser ? (
                    <Loader2 size={24} className="animate-spin mr-2" />
                  ) : (
                    <Trash2 size={24} className="mr-2" />
                  )}
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
