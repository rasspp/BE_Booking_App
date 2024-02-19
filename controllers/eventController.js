import Event from "../models/eventModel.js";

export const addEvent = async (req, res) => {
   try {
      const { title, customerName, email, phoneNumber, guestCount, start, end, status } = req.body;

      const newEvent = new Event({
         title,
         customerName,
         phoneNumber,
         guestCount,
         start,
         end,
         status,
      });

      await newEvent.save();

      res.status(201).json({ message: "Acara berhasil ditambahkan", event: newEvent });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const getEvents = async (req, res) => {
   try {
      const events = await Event.find();
      res.json(events);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const deleteEvent = async (req, res) => {
   const eventId = req.params.id;

   try {
      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if (!deletedEvent) {
         return res.status(404).json({ message: "Acara tidak ditemukan" });
      }

      res.json({ message: "Acara berhasil dihapus", deletedEvent });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const updateEventStatus = async (req, res) => {
   const eventId = req.params.id;
   const newStatus = req.body.status;

   try {
      const updatedEvent = await Event.findByIdAndUpdate(
         eventId,
         { $set: { status: newStatus } },
         { new: true } // Mengembalikan dokumen yang telah diperbarui
      );

      if (!updatedEvent) {
         return res.status(404).json({ message: "Acara tidak ditemukan" });
      }

      res.json({ message: "Status acara berhasil diperbarui", updatedEvent });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
