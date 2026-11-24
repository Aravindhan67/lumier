import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
