import { useState } from "react";
import { cn } from "../lib/utils";
import { useToast } from "@/components/ui/use-toast";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useUpdateUserInfoMutation } from "@/hooks/users/userApiSlice";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

type EditProfileCardProps = {
  isVisible: boolean;
  userId: string | null;
  user: any;
  onClose: () => void;
};
// EditProfileCard component. This component is a modal that allows the user to edit their profile information.
const EditProfileCard = ({ isVisible, userId, user, onClose }: EditProfileCardProps) => {
  // Initialize the state variables with the user's information
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [number, setNumber] = useState(user?.phone_number);
  const [schoolOrg, setSchoolOrg] = useState(user?.school_organization);
  const [birthday, setBirthday] = useState<Date | undefined>(user?.birthday ? new Date(user?.birthday) : undefined);
  const [bio, setBio] = useState(user?.bio);
  const { toast } = useToast();

  const [updateInfo] = useUpdateUserInfoMutation();

  // If the modal is not visible, return null
  if (!isVisible) return null;

  // Handle the form submission. Requires the use to have a first name, last name, email, and school/organization.
  // If the phone number is provided, it must be a valid phone number. If the email is provided, it must be a valid email.
  // If all the required fields are provided, update the user's information and close the modal.
  const handleSubmit = async () => {
    if (firstname === "" || firstname === undefined) {
      toast({ variant: "destructive", description: "First name is required." });
      return;
    } else if (lastname === "" || lastname === undefined) {
      toast({ variant: "destructive", description: "Last name is required." });
      return;
    } else if (email === "" || email === undefined) {
      toast({ variant: "destructive", description: "Email is required." });
      return;
    } else if (schoolOrg === "" || schoolOrg === undefined) {
      toast({
        variant: "destructive",
        description: "School/Organization is required.",
      });
      return;
    }

    const birthdate = birthday as Date;
    if (number === undefined || isPossiblePhoneNumber(number)) {
      await updateInfo({
        userId: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone_number: number,
        school_organization: schoolOrg,
        birthday: birthdate,
        bio: bio,
      });
    }
    onClose();
  };

  // Return the modal with the user's information
  const content = (
    <div
      id="update-profile-popup"
      tabIndex={-1}
      className="h-modal fixed flex w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
    >
      <Card className="relative h-full w-full max-w-3xl !bg-card p-4 sm:p-5 md:h-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-center rounded-t border-b">
          <CardHeader className="mt-0 pt-2 font-Audiowide text-3xl font-semibold uppercase text-foreground shadow-none">
            Update Profile
          </CardHeader>
          <Button variant="ghost" size="icon" className="absolute right-2 top-1 hover:bg-transparent" onClick={onClose}>
            <X className="text-3xl text-primary hover:text-primary-hover" />
          </Button>
        </div>
        {/* End Modal Header */}

        {/* Modal Body */}
        <form>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            {/* First Name Field */}
            <div>
              <label htmlFor="firstname" className="mb-2 block text-sm font-medium text-foreground-secondary">
                First Name
              </label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                className="block w-full rounded-lg border bg-foreground p-2.5 text-sm text-background"
                placeholder="Ex. John"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            {/* End First Name Field */}

            {/* Last Name Field */}
            <div>
              <label
                id="lastnameedit"
                htmlFor="lastname"
                className="mb-2 block text-sm font-medium text-foreground-secondary"
              >
                Last Name
              </label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                className="block w-full rounded-lg border bg-foreground p-2.5 text-sm text-background"
                placeholder="Ex. Doe"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            {/* End Last Name Field */}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground-secondary">
                Email
              </label>
              <Input
                type="text"
                name="email"
                id="email"
                value={email}
                className="block w-full rounded-lg border bg-foreground p-2.5 text-sm text-background"
                placeholder="Ex. johndoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* End Email Field */}

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone_number" className="mb-2 block text-sm font-medium text-foreground-secondary">
                Phone Number
              </label>
              <PhoneInput
                defaultCountry="US"
                international
                countryCallingCodeEditable={false}
                onChange={setNumber}
                value={number}
                className="flex w-full items-center rounded-lg border bg-foreground p-2.5 text-sm text-background"
                placeholder="Enter phone number"
              />
            </div>
            {/* End Phone Number Field */}

            {/* School/Organization Field */}
            <div>
              <label htmlFor="school_org" className="mb-2 block text-sm font-medium text-foreground-secondary">
                School/Organization
              </label>
              <Input
                type="text"
                value={schoolOrg}
                name="school_org"
                id="school_org"
                className="block w-full rounded-lg border bg-foreground p-2.5 text-sm text-background"
                placeholder="Ex. University of Central Florida"
                onChange={(e) => setSchoolOrg(e.target.value)}
              />
            </div>
            {/* End School/Organization Field */}

            {/* Birthday Field */}
            <div>
              <label htmlFor="birthday" className="mb-2 block text-sm font-medium text-foreground-secondary">
                Birthday
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "block w-full rounded-lg border bg-foreground p-2.5 text-sm hover:bg-foreground hover:text-muted-foreground",
                      birthday && "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center justify-start font-sans font-normal normal-case tracking-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthday ? format(birthday, "LLL dd, y") : <span>Pick a date</span>}
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <Calendar mode="single" selected={birthday} onSelect={setBirthday} />
                </PopoverContent>
              </Popover>
            </div>
            {/* End Birthday Field */}

            {/* Bio Field */}
            <div className="sm:col-span-2">
              <label htmlFor="bio" className="mb-2 block text-sm font-medium text-foreground-secondary">
                Bio
              </label>
              <Textarea
                id="bio"
                rows={5}
                className="block w-full rounded-lg border bg-foreground p-2.5 text-sm text-background"
                placeholder="Write a summary about yourself..."
                onChange={(e) => setBio(e.target.value)}
              >
                {bio}
              </Textarea>
            </div>
            {/* End Bio Field */}
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="rounded-full px-4 py-2 font-Audiowide font-semibold uppercase"
              onClick={handleSubmit}
            >
              Update Profile
            </Button>
          </div>
        </form>
        {/* End Modal Body */}
      </Card>
    </div>
  );
  return content;
};

export default EditProfileCard;
