import { Schema, model } from "mongoose";



const userProfileSchema = new Schema(
  {
   authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    primaryEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    publicEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    bio: {
      type: String,
      trim: true,
      min: 10,
      max: 100,
    },
    avatar: {
      type: String,
      trim: true,
      default: "https://i.pravatar.cc/300",
    },
    dateOfBirth: {
      type: Date,
      trim: true,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", userProfileSchema);

export default Profile;
