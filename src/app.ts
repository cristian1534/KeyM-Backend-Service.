import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { mongoConnection } from "./infrastructure/database/mongo";

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));






const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    process.env.NODE_ENV === "development"
      ? console.log(`Server running at ${PORT} Development`)
      : console.log(`Server running at ${PORT} Production`);
  });

mongoConnection();