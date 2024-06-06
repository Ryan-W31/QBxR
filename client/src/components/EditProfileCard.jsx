import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserInfoAndRefresh,
  useUpdateUserInfoMutation,
} from "../hooks/users/userApiSlice";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import validator from "validator";
import { AiOutlineClose } from "react-icons/ai";

const EditProfileCard = ({ isVisible, id, user, onClose }) => {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.phone_number);
  const [schoolOrg, setSchoolOrg] = useState(user.school_organization);
  const [birthday, setBirthday] = useState(user.birthday);
  const [bio, setBio] = useState(user.bio);
  const dispatch = useDispatch();

  const [updateUserInfo] = useUpdateUserInfoMutation();
  if (!isVisible) return null;

  const formatBirthday = (date) => {
    const d = date.substring(0, 10);
    return d;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const content = (
    <div
      id="update-profile-popup"
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto font-Audiowide">
        <div className="relative p-4 bg-dark-secondary rounded-lg sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-light-primary">
              Update Profile
            </h3>
            <button
              type="button"
              className="absolute top-3 right-2.5 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center"
              onClick={onClose}
            >
              <AiOutlineClose className="cursor-pointer text-3xl text-green-primary hover:text-green-secondary" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                  className="bg-light-primary border text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ex. John"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
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
                  className="bg-light-primary border text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ex. Doe"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
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
                  className="bg-light-primary border text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ex. johndoe@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
                  className="bg-light-primary border text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ex. 123 456 7890"
                />
              </div>
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
                  className="bg-light-primary border text-sm rounded-lg block w-full p-2.5"
                  placeholder="University of Central Florida"
                  onChange={(e) => setSchoolOrg(e.target.value)}
                />
              </div>
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
                  className="bg-light-primary border text-sm rounded-lg block w-full p-2.5"
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
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
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="text-light-primary bg-green-primary hover:bg-green-secondary font-medium rounded-lg text-sm px-4 py-2 text-center"
                onClick={(e) => handleSubmit(e)}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return content;
};

export default EditProfileCard;
