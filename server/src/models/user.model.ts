import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  role: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  school_organization: string;
  bio: string;
  birthday: Date;
  status: boolean;
  favorites: mongoose.Schema.Types.ObjectId[];
  phone_number: string;
  score: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    | "_id"
    | "role"
    | "firstname"
    | "lastname"
    | "email"
    | "school_organization"
    | "bio"
    | "birthday"
    | "status"
    | "favorites"
    | "phone_number"
    | "score"
    | "isVerified"
    | "createdAt"
    | "updatedAt"
  >;
}

// userSchema is used to store the user's information.
const userSchema = new mongoose.Schema<UserDocument>(
  {
    role: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    school_organization: {
      type: String,
    },
    bio: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    status: {
      type: Boolean,
      required: true,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    phone_number: {
      type: String,
    },
    score: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return compareValue(password, this.password);
};

userSchema.methods.omitPassword = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
