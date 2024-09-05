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
      toast({
        variant: "destructive",
        description: "Your link is invalid or expired.",
      });
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
      toast({
        variant: "destructive",
        description: "Failed to send verification email.",
      });
    }
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-10 md:space-x-16">
      <Card className="m-6 w-full max-w-xl p-6">
        <CardHeader className="text-center font-Audiowide font-bold shadow-none">
          <h1 className="text-5xl text-primary">QBxR</h1>
          <h3 className="text-2xl uppercase text-primary">Email Verification</h3>
        </CardHeader>
        <hr className="border-light-secondary w-full" />
        <CardContent className="flex w-full flex-col p-0">
          <>
            {isSuccess ? (
              <div className="md:text-md mt-4 flex flex-col gap-y-8 text-center text-sm lg:text-xl">
                <p>
                  Your email has been verified <span className="font-semibold text-primary">successfully!</span>
                </p>
                <Button className="md:text-md rounded-full text-sm lg:text-xl" asChild>
                  <Link to="/home" className="flex flex-row items-center">
                    <House size={24} className="mr-2" />
                    Go To Home Page
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <p className="md:text-md mt-4 text-center text-sm lg:text-xl">
                  Enter your email to resend the verification email.
                </p>

                {emailSuccess && (
                  <p className="md:text-md mt-4 text-center text-sm lg:text-xl">
                    Email sent to <span className="font-semibold text-primary">{email}</span> successfully!
                  </p>
                )}

                {emailError && (
                  <p className="md:text-md mt-4 text-center text-sm font-semibold text-destructive lg:text-xl">
                    An error occurred while sending the email. Please try again.
                  </p>
                )}
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onSubmit)}>
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mb-4 mt-4">
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
                    <div className="flex items-center justify-center">
                      <Button
                        disabled={emailPending}
                        type="submit"
                        className="w-full rounded-full text-center text-lg shadow-xl md:mt-8 md:w-1/2 md:text-xl"
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
