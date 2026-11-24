import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  role: { type: String, required: true },
  event: { type: String, required: true },
  rating: { type: Number, default: 5 },
  avatar: { type: String },
  comment: { type: String, required: true }
}, { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);
