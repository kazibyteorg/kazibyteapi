import app from "./app";
// import db from "./config/dbUrl";
import "dotenv/config";
import "routes/routes";
import mongoose from "mongoose";

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
