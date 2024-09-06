import { useSendPasswordResetEmailMutation } from "../hooks/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { emailSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

// ForgotPasswordPage component. This component displays the forgot password form.
const ForgotPasswordPage = () => {
  const { toast } = useToast();

  const [sendResetPasswordEmail, { isLoading: isSendingEmail, isSuccess: isEmailSuccess }] =
    useSendPasswordResetEmailMutation();

  const resetEmailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: { email: z.infer<typeof emailSchema> }) {
    try {
      sendResetPasswordEmail(data.email);
      toast({ description: "Password reset email sent successfully." });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description: "Failed to send password reset email.",
      });
    }
  }

  // Return the forgot password form
  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-10">
      <Card className="m-6 w-full max-w-lg p-6">
        <CardHeader className="text-center font-Audiowide font-bold shadow-none">
          <h1 className="text-5xl text-primary">QBxR</h1>
          <h3 className="text-2xl text-primary uppercase">Forgot Password</h3>
        </CardHeader>
        <hr className="w-full border-foreground-secondary" />
        <CardContent className="flex flex-col justify-center pt-4">
          {!isEmailSuccess ? (
            <>
              <p className="text-md text-center text-foreground">
                Please enter the email you used to sign up with and we will send you a link to reset your password.
              </p>
              <div className="my-4" />
              <Form {...resetEmailForm}>
                <form onSubmit={resetEmailForm.handleSubmit(onSubmit)}>
                  <FormField
                    control={resetEmailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
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
                  <div className="text-center">
                    <Button type="submit" size="lg" disabled={isSendingEmail}>
                      {isSendingEmail ? (
                        <>
                          <Loader2 size={24} className="mr-2 animate-spin" /> Sending Email...
                        </>
                      ) : (
                        "Send Email"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <p className="text-md text-center text-foreground">
              An email with a link to reset your password has been sent to{" "}
              <span className="text-primary">{resetEmailForm.getValues("email")}</span>
              .
              <br />
              <br />
              Please check your inbox and/or spam/junk folder.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPasswordPage;
