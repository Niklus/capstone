import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.router";
import errorHandler from "./middleware/error.middleware";
import connectDB from "./config/db";

dotenv.config();

const { PORT = 3000, MONGO_URI = "" } = process.env;

connectDB(MONGO_URI);

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
