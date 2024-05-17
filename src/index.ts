import app from "./app";
// import db from "./config/dbUrl";
import "dotenv/config";
import { registration, login, getDashboard, getUser } from "./routes";
import mongoose from "mongoose";

import notification from "@/routes/notification";

app;
// db;

mongoose
  .connect("mongodb://localhost:27017/kazibyte_api")
  .then(() => {
    console.log("Connected to MongoDB success localhost");
  })
  .catch((err) => {
    console.log(err);
  });

// all the routes are defined here

const allRoutes = [registration, login, getUser];
const dashboard = getDashboard;

app.use("/", dashboard);
app.use("/auth", allRoutes);
app.use("/", getUser);

app.use("/", notification);
