import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  client: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: String, required: true },
  location: { type: String, required: true },
  guestCount: { type: Number, required: true },
  budgetRange: { type: String, required: true },
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  headline: { type: String, required: true },
  story: { type: String, required: true },
  highlights: [{ type: String }],
  testimonial: {
    quote: String,
    author: String,
    role: String
  }
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);
