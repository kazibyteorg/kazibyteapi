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

// faq
import {
  createFAQ,
  getByIdFAQ,
  getAllFAQs,
  updateFAQ,
  deleteFAQ,
} from "./index";

app.use("/", createFAQ);
app.use("/", getByIdFAQ);
app.use("/", getAllFAQs);
app.use("/", updateFAQ);
app.use("/", deleteFAQ);
