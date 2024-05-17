import app from "@/app";
import {
  registration,
  login,
  getDashboard,
  getUser,
  createProfile,
  updateProfile,
  getProfile,
  deleteProfile,
  getAllProfiles,
} from "./index";
import notification from "@/routes/notification";

// all the routes are defined here

const allRoutes = [
  registration,
  login,
  getUser,
  createProfile,
  updateProfile,
  getProfile,
  deleteProfile,
  getAllProfiles,
];
const dashboard = getDashboard;

app.use("/", dashboard, createProfile);
app.use("/auth", allRoutes);
app.use("/", getUser);

app.use("/", notification);
