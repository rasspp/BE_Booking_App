import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const db = process.env.MONGO_URI;
// DB Local
// const db = process.env.DBLOCAL;

app.use(cors());

app.use((req, res, next) => {
   const allowedOrigins = ["https://www.zuppasoup.my.id"];
   const origin = req.headers.origin;

   if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
   }

   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "Content-Type");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", eventRoutes);

app.get("/", (req, res) => {
   res.send("<h1>Server telah aktif dan berjalan di http://localhost:" + port + "</h1>");
});

mongoose.set("strictQuery", false);
mongoose.connect(db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.listen(port, () => {
   console.log(`Server berjalan di http://localhost:${port}`);
});
