import app from "./app";
// import db from "./config/dbUrl";
import "dotenv/config";
import { registration, login, getDashboard } from "./routes";
import mongoose from "mongoose";

import notification from "@/routes/notification";
import { SenderController } from "./controllers/notification/sending";

import { receiveNotifications } from "./controllers/notification/Notification";

app;
// db;

mongoose
  .connect("mongodb://localhost:27017/auth_mechanisms")
  .then(() => {
    console.log("Connected to MongoDB success");
  })
  .catch((err) => {
    console.log(err);
  });

// all the routes are defined here

const allRoutes = [registration, login];
const dashboard = getDashboard;

app.use("/", dashboard);
app.use("/auth", allRoutes);

app.use("/", notification);

async () => {
  await SenderController.getInstance();
  await receiveNotifications();
};
