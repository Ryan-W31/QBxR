import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { registerFormSchema, roleEnum } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSignUpMutation } from "@/hooks/auth/authApiSlice";

interface CustomError {
  status: number;
  data: {
    message: string;
  };
}

// LoginPage component. This component displays the login form.
const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [customError, setCustomError] = useState("");

  const navigate = useNavigate();

  const registerForm = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      role: roleEnum.enum.NONPLAYER,
      firstname: "",
      lastname: "",
      school_organization: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [signUp, { isLoading }] = useSignUpMutation();

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const onFormError = (errors: any) => {
    const errorFields = ["firstname", "lastname", "school_organization", "email", "password", "confirmPassword"];

    for (const field of errorFields) {
      if (errors[field]) {
        setShowError(true);
        setCustomError(errors[field]?.message || "Sign up failed. Please try again later.");
        break;
      }
    }
  };

  // Handle the login event
  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      await signUp({ ...data }).unwrap();
      navigate("/email", { replace: true });
    } catch (error) {
      const err = error as CustomError;
      setShowError(true);
      setCustomError(err.data?.message || "Sign up failed. Please try again later.");
    }
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-10">
      <Card className="m-6 w-full max-w-lg p-6">
        <CardHeader className="text-center font-Audiowide text-5xl font-bold text-primary">QBxR</CardHeader>
        {showError && <ErrorMessage message={customError} onClose={() => setShowError(false)} />}
        <CardContent className="flex w-full flex-col p-0">
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onSubmit, onFormError)}>
              <FormField
                control={registerForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Tabs defaultValue={field.value} onValueChange={field.onChange}>
                        <TabsList className="w-full justify-center">
                          <TabsTrigger className="w-1/2 uppercase" value={roleEnum.enum.NONPLAYER}>
                            Non-Player
                          </TabsTrigger>
                          <TabsTrigger className="w-1/2 uppercase" value={roleEnum.enum.PLAYER}>
                            Player
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>First Name</FormLabel>
                    <FormControl className="!mt-0">
                      <Input
                        {...field}
                        type="text"
                        placeholder="First Name"
                        className="bg-foreground text-background focus:border-2 focus:border-primary"
                        autoFocus
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl className="!mt-0">
                      <Input
                        {...field}
                        type="text"
                        placeholder="Last Name"
                        className="bg-foreground text-background focus:border-2 focus:border-primary"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="school_organization"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>School or Organization</FormLabel>
                    <FormControl className="!mt-0">
                      <Input
                        {...field}
                        type="text"
                        placeholder="School or Organization"
                        className="bg-foreground text-background focus:border-2 focus:border-primary"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl className="!mt-0">
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className="bg-foreground text-background focus:border-2 focus:border-primary"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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
              <div className="mt-4 flex items-center justify-start text-sm">
                <Checkbox id="tnc" />
                <label htmlFor="tnc" className="ml-2 text-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <div className="mt-4 text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full font-Audiowide tracking-wider"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={24} className="mr-2 animate-spin" /> Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center font-Audiowide text-sm uppercase">
            Already have an account?{" "}
            <Button variant="link" className="p-0 text-sm text-primary" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
