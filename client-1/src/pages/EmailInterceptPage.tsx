import { useSelector } from "react-redux";
import { selectCurrentUser } from "../hooks/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { useSendEmailVerificationMutation } from "@/hooks/auth/authApiSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

const EmailInterceptPage = () => {
  const user = useSelector(selectCurrentUser);
  const [sendEmailVerification, { isLoading }] = useSendEmailVerificationMutation();
  const { toast } = useToast();

  const handleResend = async () => {
    try {
      await sendEmailVerification({
        email: user?.email,
      });
      toast({ description: "Verification email sent successfully." });
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", description: "Failed to send verification email." });
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center space-y-10 md:space-x-16 items-center">
      <Card className="m-6 w-full max-w-xl p-6">
        <CardHeader className="text-center font-Audiowide font-bold shadow-none">
          <h1 className="text-5xl text-primary">QBxR</h1>
          <h3 className="text-2xl text-primary">Email Verification</h3>
        </CardHeader>
        <hr className="border-light-secondary w-full" />
        <CardContent className="flex flex-col justify-center pt-4">
          <div className="space-y-8">
            <p className="text-foreground font-Audiowide text-xl text-center">
              A verification link has been sent to {user?.email}.
              <br /> Please check your inbox and/or spam folder.
            </p>
            <p className="text-foreground font-Audiowide text-xl text-center">Didn't recieve an email?</p>
            <Button onClick={handleResend} disabled={isLoading} className="w-full">
              {isLoading ? (
                <div className="flex items-center jusitfy-center text-xl text-foreground">
                  <Loader2 size={24} className="mr-2 animate-spin" /> Resending Email...
                </div>
              ) : (
                <div className="flex items-center jusitfy-center text-xl text-foreground">
                  <Send size={24} className="mr-2" />
                  Resend Email
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EmailInterceptPage;
