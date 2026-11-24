import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { 
    type: String, 
    required: true,
    enum: ['Corporate Gala', 'Luxury Wedding', 'Brand Activation', 'Concert & Festival', 'Private VIP Soirée', 'Award Ceremony', 'Charity Gala', 'Custom Event']
  },
  guestCount: { type: Number, required: true },
  targetDate: { type: String, required: true },
  location: { type: String, default: 'Undecided / Flexible' },
  estimatedBudget: { type: String, required: true },
  visionDetails: { type: String, default: '' },
  servicePreferences: [{ type: String }],
  status: {
    type: String,
    enum: ['New', 'Under Review', 'Proposal Drafted', 'Consultation Booked', 'Confirmed'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['Standard', 'High', 'VIP Tier'],
    default: 'Standard'
  },
  createdAt: { type: Date, default: Date.now }
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
