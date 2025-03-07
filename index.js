const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const dotenv = require("dotenv");

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
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Aktif</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          color: #666;
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .footer {
          margin-top: 2rem;
          color: #999;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Server Aktif 🚀</h1>
        <p>Server telah berhasil dijalankan dan berjalan di <strong>http://localhost:${port}</strong>.</p>
        <p>Selamat mencoba dan semoga harimu menyenangkan!</p>
        <div class="footer">
          Dibuat dengan ❤️ oleh Tim Developer
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

mongoose.set("strictQuery", false);
mongoose.connect(db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.listen(port, () => {
   console.log(`Server berjalan di http://localhost:${port}`);
});
