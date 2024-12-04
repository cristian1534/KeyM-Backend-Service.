import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { mongoConnection } from "./Booking/infrastructure/database/mongo";
import bookingRoutes from "./Booking/infrastructure/routes/booking.routes";
import userRoutes from "./User/infrastructure/routes/user.routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./Booking/infrastructure/documentation/swagger.documentation";

const app = express();
const specs = swaggerJSDoc(options);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/booking", bookingRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  process.env.NODE_ENV === "development"
    ? console.log(`Server running at ${PORT} Development`)
    : console.log(`Server running at ${PORT} Production`);
});
mongoConnection();

export default app;