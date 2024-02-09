import bcrypt from "bcrypt";
import User from "../models/authModel.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const registerUser = async (req, res) => {
   try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });

      if (existingUser) {
         return res.status(409).json({ message: "Nama pengguna sudah digunakan" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "Registrasi berhasil" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const loginUser = async (req, res) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
         return res.status(401).json({ message: "Login gagal" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         return res.status(401).json({ message: "Login gagal" });
      }

      const token = jwt.sign({ username: user.username }, "secret-key");
      res.json({ token });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
