import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

const EmailInterceptPage = () => {
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
              A verification link has been sent to you email.
              <br /> Please check your inbox and/or spam folder.
            </p>
            <p className="text-foreground font-Audiowide text-xl text-center">Didn't recieve an email?</p>
            <Button className="w-full" asChild>
              <Link to="/verify" className="flex items-center jusitfy-center text-xl text-foreground">
                <Send size={24} className="mr-2" />
                Resend Email
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EmailInterceptPage;
