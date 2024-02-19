import express from "express";
import { addEvent, getEvents, deleteEvent, updateEventStatus } from "../controllers/eventController.js";

const router = express.Router();

router.get("/event", getEvents);
router.post("/event", addEvent);
router.delete("/event/:id", deleteEvent);
router.put("/event/:id/status", updateEventStatus); // Tambahkan rute untuk mengubah status acara

export default router;
