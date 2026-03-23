import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import customerRoutes from "./routes/customer.routes";
import projectRoutes from "./routes/project.routes";
import estimationRoutes from "./routes/estimation.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import jobCardRoutes from "./routes/jobCard.routes";

const app = express();
app.use(cors({
    origin: ["http://13.233.156.120"],
  }));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("src/uploads"));
app.use("/api/customers", customerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/estimations", estimationRoutes);
app.use("/api/job-cards", jobCardRoutes);
export default app;
