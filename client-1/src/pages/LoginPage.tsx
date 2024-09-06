import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../hooks/auth/authApiSlice";
import ErrorMessage from "@/components/ErrorMessage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface CustomError {
  status: number;
  data: {
    message: string;
  };
}

// LoginPage component. This component displays the login form.
const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  // Handle the login event
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await login({ ...data }).unwrap();
      const isVerified = response?.user?.isVerified;
      navigate(isVerified ? "/home" : "/email", { replace: true });
    } catch (error) {
      const err = error as CustomError;
      setShowError(true);
      setCustomError(err.data?.message || "Login failed. Please try again later.");
    }
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-10">
      <Card className="m-6 w-full max-w-lg p-6">
        <CardHeader className="text-center font-Audiowide text-5xl font-bold text-primary">QBxR</CardHeader>
        {showError && <ErrorMessage message={customError} onClose={() => setShowError(false)} />}
        <CardContent className="flex w-full flex-col p-0">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className="bg-foreground text-background focus:border-2 focus:border-primary"
                        autoFocus
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
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
              <div className="flex items-center justify-end text-sm">
                <Button variant="link" className="p-0 text-sm uppercase text-primary" asChild>
                  <Link to="/forgot">Forgot Password?</Link>
                </Button>
              </div>
              <div className="mt-4 text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full font-Audiowide font-semibold uppercase tracking-wider"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={24} className="mr-2 animate-spin" /> Logging In...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center font-Audiowide text-sm uppercase">
            Don't have an account yet?{" "}
            <Button variant="link" className="p-0 text-sm uppercase text-primary" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
