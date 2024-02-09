import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/form_calendar", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.use("/auth", authRoutes);
app.use("/api", eventRoutes);

app.listen(port, () => {
   console.log(`Server berjalan di http://localhost:${port}`);
});
