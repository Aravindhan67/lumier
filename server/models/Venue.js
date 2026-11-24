import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: String, required: true },
  vibe: { type: String, required: true },
  image: { type: String, required: true },
  highlights: [{ type: String }],
  priceTier: { type: String, required: true }
}, { timestamps: true });

export const Venue = mongoose.model('Venue', venueSchema);
