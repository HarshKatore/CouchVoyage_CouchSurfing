import express from "express";
import dotenv from "dotenv";
import roomRouter from "./routes/roomRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "PUT",
    "POST",
    "DELETE",
    "PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-with, Content-TypeError, Authorization"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));

app.use("/user", userRouter);
app.use("/room", roomRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our API" });
});
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
