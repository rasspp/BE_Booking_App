import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import dotenv from "dotenv";

dotenv.config();

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "Content-Type");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});

const app = express();
const port = process.env.PORT || 3000;
const db = process.env.DB;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api", eventRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.listen(port, () => {
   console.log(`Server berjalan di http://localhost:${port}`);
});
