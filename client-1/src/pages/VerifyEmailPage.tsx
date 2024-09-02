import { useEffect, useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSendEmailVerificationMutation, useVerifyEmailQuery } from "@/hooks/auth/authApiSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { House, Loader2, Send } from "lucide-react";
import { verifyEmailSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const VerifyEmailPage = () => {
  const [email, setEmail] = useState("test");
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const code = searchParams.get("code");

  const emailForm = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const [sendEmailVerification, { isSuccess: emailSuccess, isError: emailError, isLoading: emailPending }] =
    useSendEmailVerificationMutation();

  const {
    data: data,
    isSuccess,
    isError,
  } = useVerifyEmailQuery(code, {
    skip: !code,
  });

  const handleVerification = useCallback(async () => {
    if (isSuccess) {
      toast({ description: "Email verified successfully." });
    } else if (isError) {
      toast({ variant: "destructive", description: "Your link is invalid or expired." });
    }
  }, [data, toast]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    try {
      sendEmailVerification({ ...data });
      setEmail(data.email);
      toast({ description: "Verification email sent successfully." });
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", description: "Failed to send verification email." });
    }
  }

  return (
    <section className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Card className="m-6 w-full max-w-xl p-6">
        <CardHeader className="text-center font-Audiowide font-bold shadow-none">
          <h1 className="text-5xl text-primary">QBxR</h1>
          <h3 className="text-2xl text-primary">Email Verification</h3>
        </CardHeader>
        <hr className="border-light-secondary w-full" />
        <CardContent className="flex flex-col w-full p-0">
          <>
            {isSuccess ? (
              <div className="flex flex-col gap-y-8 text-center text-sm md:text-md lg:text-xl mt-4">
                <p>
                  Your email has been verified <span className="font-semibold text-primary">successfully!</span>
                </p>
                <Button className="rounded-full text-sm md:text-md lg:text-xl" asChild>
                  <Link to="/home" className="flex flex-row items-center">
                    <House size={24} className="mr-2" />
                    Go To Home Page
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <p className="text-center text-sm md:text-md lg:text-xl mt-4">
                  Enter your email to resend the verification email.
                </p>

                {emailSuccess && (
                  <p className="text-center mt-4 text-sm md:text-md lg:text-xl">
                    Email sent to <span className="text-primary font-semibold">{email}</span> successfully!
                  </p>
                )}

                {emailError && (
                  <p className="text-center text-sm md:text-md lg:text-xl text-destructive font-semibold mt-4">
                    An error occurred while sending the email. Please try again.
                  </p>
                )}
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onSubmit)}>
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mt-4 mb-4">
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Email Address"
                              className="bg-foreground text-background focus:border-primary focus:border-2"
                              autoFocus
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-center">
                      <Button
                        disabled={emailPending}
                        type="submit"
                        className="text-center w-full md:w-1/2 text-lg md:text-xl shadow-xl rounded-full md:mt-8"
                      >
                        {emailPending ? (
                          <Loader2 size={24} className="animate-spin" />
                        ) : (
                          <Send size={24} className="mr-2" />
                        )}
                        Resend Email
                      </Button>
                    </div>
                  </form>
                </Form>
              </>
            )}
          </>
        </CardContent>
      </Card>
    </section>
  );
};

export default VerifyEmailPage;
