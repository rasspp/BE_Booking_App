import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
const db = process.env.DB;

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.use("/auth", authRoutes);
app.use("/api", eventRoutes);

app.listen(port, () => {
   console.log(`Server berjalan di http://localhost:${port}`);
});
