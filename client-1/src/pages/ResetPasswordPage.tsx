import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../hooks/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { resetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";

// ForgotPasswordPage component. This component displays the forgot password form.
const ResetPasswordPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { toast } = useToast();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && now < exp;

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

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

  // Handle the forgot password event
  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    try {
      resetPassword({ ...data, verificationCode: code });
      toast({ description: "Password reset successfully." });
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description: "Failed to reset password.",
      });
    }
  }

  // Return the forgot password form
  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-10">
      <Card className="m-6 w-full max-w-lg p-6">
        <CardHeader className="text-center font-Audiowide font-bold shadow-none">
          <h1 className="text-5xl text-primary">QBxR</h1>
          <h3 className="text-2xl text-primary">Forgot Password</h3>
        </CardHeader>
        <hr className="w-full border-foreground-secondary" />
        <CardContent className="flex flex-col justify-center pt-4">
          {linkIsValid ? (
            <>
              <p className="text-center font-Audiowide text-sm text-foreground">Please enter a new password.</p>

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
                              className="bg-foreground text-background focus:border-2 focus:border-primary"
                              required
                            />
                            <Button
                              variant="ghost"
                              type="button"
                              size="icon"
                              className="absolute right-0 top-0 shadow-none hover:bg-transparent"
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
                              className="bg-foreground text-background focus:border-2 focus:border-primary"
                              required
                            />
                            <Button
                              variant="ghost"
                              type="button"
                              size="icon"
                              className="absolute right-0 top-0 shadow-none hover:bg-transparent"
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
                  <div className="mt-4 text-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-full font-Audiowide tracking-wider"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={24} className="mr-2 animate-spin" /> Resetting Password...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-md text-center font-Audiowide text-foreground">
                The link you used to reset your password has expired. <br />
                Please request a new link.
              </p>
              <Button
                size="lg"
                className="w-full rounded-full font-Audiowide tracking-wider"
                onClick={() => navigate("/forgot", { replace: true })}
              >
                Request New Link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPasswordPage;
