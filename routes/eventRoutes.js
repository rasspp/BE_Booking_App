import express from "express";
import { addEvent, getEvents, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/event", getEvents);
router.post("/event", addEvent);
router.delete("/event/:id", deleteEvent);

export default router;
