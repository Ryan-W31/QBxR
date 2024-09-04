import { useState } from "react";
import { formatBirthday } from "../lib/utils";
import { useToast } from "@/components/ui/use-toast";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useUpdateUserInfoMutation } from "@/hooks/users/userApiSlice";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
  const [birthday, setBirthday] = useState(user?.birthday);
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
      toast({ variant: "destructive", description: "School/Organization is required." });
      return;
    }

    if (number === undefined || isPossiblePhoneNumber(number)) {
      await updateInfo({
        userId: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone_number: number,
        school_organization: schoolOrg,
        birthday: new Date(birthday),
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
      className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
      <Card className="relative !bg-card p-4 w-full h-full md:h-auto max-w-3xl sm:p-5">
        {/* Modal Header */}
        <div className="flex justify-center items-center rounded-t border-b">
          <CardHeader className="pt-2 text-3xl font-semibold text-foreground shadow-none mt-0 uppercase font-Audiowide">
            Update Profile
          </CardHeader>
          <Button variant="ghost" size="icon" className="absolute top-1 right-2 hover:bg-transparent" onClick={onClose}>
            <X className="text-3xl text-primary hover:text-primary-hover" />
          </Button>
        </div>
        {/* End Modal Header */}

        {/* Modal Body */}
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            {/* First Name Field */}
            <div>
              <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-foreground-secondary ">
                First Name
              </label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                className="bg-foreground text-background border text-sm rounded-lg block w-full p-2.5"
                placeholder="Ex. John"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            {/* End First Name Field */}

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-foreground-secondary">
                Last Name
              </label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                className="bg-foreground text-background border text-sm rounded-lg block w-full p-2.5"
                placeholder="Ex. Doe"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            {/* End Last Name Field */}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground-secondary">
                Email
              </label>
              <Input
                type="text"
                name="email"
                id="email"
                value={email}
                className="bg-foreground text-background border text-sm rounded-lg block w-full p-2.5"
                placeholder="Ex. johndoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* End Email Field */}

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-foreground-secondary">
                Phone Number
              </label>
              <PhoneInput
                defaultCountry="US"
                international
                countryCallingCodeEditable={false}
                onChange={setNumber}
                value={number}
                className="flex items-center bg-foreground text-background border text-sm rounded-lg w-full p-2.5"
                placeholder="Enter phone number"
              />
            </div>
            {/* End Phone Number Field */}

            {/* School/Organization Field */}
            <div>
              <label htmlFor="school_org" className="block mb-2 text-sm font-medium text-foreground-secondary">
                School/Organization
              </label>
              <Input
                type="text"
                value={schoolOrg}
                name="school_org"
                id="school_org"
                className="bg-foreground text-background border text-sm rounded-lg block w-full p-2.5"
                placeholder="University of Central Florida"
                onChange={(e) => setSchoolOrg(e.target.value)}
              />
            </div>
            {/* End School/Organization Field */}

            {/* Birthday Field */}
            <div>
              <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-foreground-secondary">
                Birthday
              </label>
              <Input
                type="date"
                value={formatBirthday(birthday)}
                name="birthday"
                id="birthday"
                className="bg-foreground text-background border text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            {/* End Birthday Field */}

            {/* Bio Field */}
            <div className="sm:col-span-2">
              <label htmlFor="bio" className="block mb-2 text-sm font-medium text-foreground-secondary">
                Bio
              </label>
              <Textarea
                id="bio"
                rows={5}
                className="block p-2.5 w-full text-sm rounded-lg border bg-foreground text-background"
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
              className="font-semibold px-4 py-2 font-Audiowide rounded-full uppercase"
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
