import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth";
import sequelize from "./util/database";
import { errorHandler } from "./controllers/error";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use(errorHandler);

const startListen = async () => {
  try {
    sequelize.sync();
    console.log("Start listening...");
    app.listen(3000);
  } catch (err) {
    console.log("Server staring failed", err);
  }
};

startListen();
