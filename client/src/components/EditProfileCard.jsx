import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfoAndRefresh } from "../hooks/users/userApiSlice";
import { formatBirthday } from "../utils/utils";
import { useToast } from "./Toast";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import validator from "validator";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Card, CardHeader, IconButton } from "@material-tailwind/react";

// EditProfileCard component. This component is a modal that allows the user to edit their profile information.
const EditProfileCard = ({ isVisible, id, user, onClose }) => {
  // Initialize the state variables with the user's information
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.phone_number);
  const [schoolOrg, setSchoolOrg] = useState(user.school_organization);
  const [birthday, setBirthday] = useState(user.birthday);
  const [bio, setBio] = useState(user.bio);
  const dispatch = useDispatch();
  const { notify } = useToast();

  // If the modal is not visible, return null
  if (!isVisible) return null;

  // Handle the form submission. Requires the use to have a first name, last name, email, and school/organization.
  // If the phone number is provided, it must be a valid phone number. If the email is provided, it must be a valid email.
  // If all the required fields are provided, update the user's information and close the modal.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstname === "" || firstname === undefined) {
      notify("First name is required.", "error", "top-right");
      return;
    } else if (lastname === "" || lastname === undefined) {
      notify("Last name is required.", "error", "top-right");
      return;
    } else if (email === "" || email === undefined) {
      notify("Email is required.", "error", "top-right");
      return;
    } else if (schoolOrg === "" || schoolOrg === undefined) {
      notify("School/Organization is required.", "error", "top-right");
      return;
    }

    if (number === undefined || isPossiblePhoneNumber(number)) {
      if (validator.isEmail(email)) {
        await dispatch(
          updateUserInfoAndRefresh({
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone_number: number,
            school_organization: schoolOrg,
            birthday: new Date(birthday),
            bio: bio,
          })
        ).unwrap();
      }
      onClose();
    }
  };

  // Return the modal with the user's information
  const content = (
    <div
      id="update-profile-popup"
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
      <Card className="relative p-4 w-full h-full md:h-auto font-Audiowide max-w-3xl bg-dark-secondary rounded-lg sm:p-5">
        {/* Modal Header */}
        <div className="flex justify-center items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
          <CardHeader className="text-lg font-semibold text-light-primary bg-transparent shadow-none mt-0">
            Update Profile
          </CardHeader>
          <IconButton
            variant="text"
            ripple={false}
            className="absolute top-1 right-2 !bg-transparent"
            onClick={onClose}
          >
            <AiOutlineClose className="text-3xl text-green-primary hover:text-green-secondary" />
          </IconButton>
        </div>
        {/* End Modal Header */}

        {/* Modal Body */}
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            {/* First Name Field */}
            <div>
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-light-secondary"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                className="bg-light-primary border text-sm rounded-lg block w-full p-2.5 placeholder:text-light-secondary"
                placeholder="Ex. John"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            {/* End First Name Field */}

            {/* Last Name Field */}
            <div>
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-light-secondary"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                className="bg-light-primary border text-sm rounded-lg block w-full p-2.5 placeholder:text-light-secondary"
                placeholder="Ex. Doe"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            {/* End Last Name Field */}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-light-secondary"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                className="bg-light-primary border text-sm rounded-lg block w-full p-2.5 placeholder:text-light-secondary"
                placeholder="Ex. johndoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* End Email Field */}

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-light-secondary"
              >
                Phone Number
              </label>
              <PhoneInput
                defaultCountry="US"
                international
                countryCallingCodeEditable={false}
                onChange={setNumber}
                value={number}
                className="flex items-center bg-light-primary border text-sm rounded-lg w-full p-2.5 placeholder:text-light-secondary"
                placeholder="Enter phone number"
              />
            </div>
            {/* End Phone Number Field */}

            {/* School/Organization Field */}
            <div>
              <label
                htmlFor="school_org"
                className="block mb-2 text-sm font-medium text-light-secondary"
              >
                School/Organization
              </label>
              <input
                type="text"
                value={schoolOrg}
                name="school_org"
                id="school_org"
                className="bg-light-primary border text-sm rounded-lg block w-full p-2.5 placeholder:text-light-secondary"
                placeholder="University of Central Florida"
                onChange={(e) => setSchoolOrg(e.target.value)}
              />
            </div>
            {/* End School/Organization Field */}

            {/* Birthday Field */}
            <div>
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-medium text-light-secondary"
              >
                Birthday
              </label>
              <input
                type="date"
                value={formatBirthday(birthday)}
                name="birthday"
                id="birthday"
                className="bg-light-primary border text-sm rounded-lg block w-full p-2.5 placeholder:text-light-secondary"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            {/* End Birthday Field */}

            {/* Bio Field */}
            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-light-secondary"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows="5"
                className="block p-2.5 w-full text-sm rounded-lg border bg-light-primary"
                placeholder="Write a summary about yourself..."
                onChange={(e) => setBio(e.target.value)}
              >
                {bio}
              </textarea>
            </div>
            {/* End Bio Field */}
          </div>
          <div className="flex justify-center">
            <Button
              className="text-light-primary bg-green-primary hover:bg-green-secondary font-medium text-sm px-4 py-2 font-Audiowide rounded-full"
              onClick={(e) => handleSubmit(e)}
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
