const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/nama_database", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const acaraSchema = new mongoose.Schema({
   title: String,
   email: String,
   start: Date,
   end: Date,
   status: String,
});

const Acara = mongoose.model("Acara", acaraSchema);

app.use(express.json());

app.post("/api/acara", async (req, res) => {
   try {
      const { title, email, start, end, status } = req.body;

      const newAcara = new Acara({
         title,
         email,
         start,
         end,
         status,
      });

      await newAcara.save();

      res.status(201).json({ message: "Acara berhasil ditambahkan" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

app.listen(PORT, () => {
   console.log(`Server berjalan di http://localhost:${PORT}`);
});
