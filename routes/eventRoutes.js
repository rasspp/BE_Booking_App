import express from "express";
import { addEvent, getEvents, getEventById, deleteEvent, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/event", getEvents);
router.get("/event/:id", getEventById);
router.post("/event", addEvent);
router.delete("/event/:id", deleteEvent);
router.put("/event/:id", updateEvent);

export default router;
