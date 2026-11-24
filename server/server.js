import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { Inquiry } from './models/Inquiry.js';
import { Event } from './models/Event.js';
import { Venue } from './models/Venue.js';
import { Review } from './models/Review.js';
import { Post } from './models/Post.js';
import { 
  eventsSeed, 
  servicesSeed, 
  packagesSeed, 
  venuesSeed, 
  reviewsSeed, 
  blogPostsSeed, 
  companyStats 
} from './data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../client/dist');

dotenv.config({ path: path.join(__dirname, '.env') });


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Format numbers into Indian numbering system (Lakhs & Crores)
export function formatINR(val) {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Crore`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

// In-Memory store fallback (Indian market sample dossiers)
let inMemoryInquiries = [
  {
    _id: 'inq-india-1',
    fullName: 'Radhika & Harshavardhan Singhania',
    email: 'radhika@singhania-group.in',
    phone: '+91 98200 45678',
    eventType: 'Royal Destination Wedding',
    guestCount: 450,
    targetDate: '2025-11-20',
    location: 'Jagmandir Island Palace, Udaipur',
    estimatedBudget: '₹3 Crore - ₹5 Crore',
    visionDetails: 'A three-day royal wedding on Lake Pichola with floating lotus mandap, 400-drone aerial show and Awadhi master khansama catering.',
    servicePreferences: ['Royal Mandap Architecture', 'Royal Dastarkhwan', 'Precision Technical AV'],
    status: 'Proposal Drafted',
    priority: 'VIP Tier',
    createdAt: new Date(Date.now() - 86400000 * 2)
  },
  {
    _id: 'inq-india-2',
    fullName: 'Dr. Siddharth M. Reddy',
    email: 'siddharth@reddy-biotech.in',
    phone: '+91 98490 12345',
    eventType: 'Corporate Conclave',
    guestCount: 1800,
    targetDate: '2025-09-15',
    location: 'Jio World Centre, BKC, Mumbai',
    estimatedBudget: '₹1 Crore - ₹2 Crore',
    visionDetails: 'Global Healthcare Leadership Summit with 60-meter curved MicroLED keynote stage and live 12-language spatial translation.',
    servicePreferences: ['Precision Technical AV', 'VIP Hospitality Concierge'],
    status: 'New',
    priority: 'High',
    createdAt: new Date(Date.now() - 3600000 * 4)
  }
];

let dbConnected = false;

// Initialize & Seed Database if connected to MongoDB Atlas
const initDatabase = async () => {
  dbConnected = await connectDB();
  if (dbConnected) {
    try {
      // Re-seed with Indian luxury data if needed
      await Event.deleteMany({});
      await Event.insertMany(eventsSeed);

      await Venue.deleteMany({});
      await Venue.insertMany(venuesSeed);

      await Review.deleteMany({});
      await Review.insertMany(reviewsSeed);

      await Post.deleteMany({});
      await Post.insertMany(blogPostsSeed);

      const inqCount = await Inquiry.countDocuments();
      if (inqCount === 0) {
        await Inquiry.insertMany(inMemoryInquiries.map(i => {
          const { _id, ...rest } = i;
          return rest;
        }));
      }
      console.log(`✨ MongoDB Atlas synchronized with Indian luxury dataset.`);
    } catch (err) {
      console.warn('Seeding notice:', err.message);
    }
  }
};

initDatabase();

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    service: 'LUMIÈRE India Luxury Event Management API (MERN)',
    database: dbConnected ? 'MongoDB Atlas Live Cluster' : 'In-Memory Resilient Store',
    currency: 'INR (₹)',
    market: 'India & Global Royal Destination',
    timestamp: new Date().toISOString()
  });
});

// Stats
app.get('/api/stats', (req, res) => {
  res.json({ success: true, stats: companyStats });
});

// Events & Portfolio
app.get('/api/events', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    if (dbConnected) {
      let query = {};
      if (category && category !== 'All') {
        query.category = { $regex: category, $options: 'i' };
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { client: { $regex: search, $options: 'i' } }
        ];
      }
      const results = await Event.find(query).sort({ year: -1 });
      return res.json({ success: true, count: results.length, data: results });
    }

    let results = [...eventsSeed];
    if (category && category !== 'All') {
      results = results.filter(e => e.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.location.toLowerCase().includes(q) || 
        e.client.toLowerCase().includes(q)
      );
    }
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.json({ success: true, count: eventsSeed.length, data: eventsSeed });
  }
});

app.get('/api/events/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  try {
    if (dbConnected) {
      const event = await Event.findOne({ $or: [{ slug: slugOrId }, { id: slugOrId }] });
      if (event) return res.json({ success: true, data: event });
    }
  } catch (err) {}

  const event = eventsSeed.find(e => e.slug === slugOrId || e.id === slugOrId);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

// Services
app.get('/api/services', (req, res) => {
  res.json({ success: true, count: servicesSeed.length, data: servicesSeed });
});

// Packages & Pricing
app.get('/api/packages', (req, res) => {
  res.json({ success: true, count: packagesSeed.length, data: packagesSeed });
});

// Venues
app.get('/api/venues', async (req, res) => {
  try {
    if (dbConnected) {
      const dbVenues = await Venue.find();
      if (dbVenues.length > 0) return res.json({ success: true, count: dbVenues.length, data: dbVenues });
    }
  } catch (err) {}
  res.json({ success: true, count: venuesSeed.length, data: venuesSeed });
});

// Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    if (dbConnected) {
      const dbReviews = await Review.find();
      if (dbReviews.length > 0) return res.json({ success: true, count: dbReviews.length, data: dbReviews });
    }
  } catch (err) {}
  res.json({ success: true, count: reviewsSeed.length, data: reviewsSeed });
});

// Blog / Journal
app.get('/api/posts', async (req, res) => {
  try {
    if (dbConnected) {
      const dbPosts = await Post.find().sort({ createdAt: -1 });
      if (dbPosts.length > 0) return res.json({ success: true, count: dbPosts.length, data: dbPosts });
    }
  } catch (err) {}
  res.json({ success: true, count: blogPostsSeed.length, data: blogPostsSeed });
});

app.get('/api/posts/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    if (dbConnected) {
      const post = await Post.findOne({ slug });
      if (post) return res.json({ success: true, data: post });
    }
  } catch (err) {}
  const post = blogPostsSeed.find(p => p.slug === slug);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  res.json({ success: true, data: post });
});

// Interactive Quote Calculator API - Indian Rupees (₹)
app.post('/api/quote-calculator', (req, res) => {
  try {
    const { 
      guestCount = 200, 
      eventType = 'Royal Destination Wedding', 
      productionTier = 'elevated', // 'standard', 'elevated', 'vanguard'
      gastronomyLevel = 'michelin', // 'curated', 'michelin', 'royal'
      floralLevel = 'luxe', // 'minimalist', 'luxe', 'couture'
      hasPyrotechnics = false,
      hasDroneShow = false,
      hasAviationConcierge = false
    } = req.body;

    const guests = Math.max(50, parseInt(guestCount) || 200);

    // Staging & AV Production in INR (Refined & Accessible)
    let baseProduction = 250000; // ₹2.5 Lakhs (Signature)
    if (productionTier === 'elevated') baseProduction = 650000; // ₹6.5 Lakhs (Rajwada Élite)
    if (productionTier === 'vanguard') baseProduction = 1500000; // ₹15 Lakhs (Imperial Vanguard)

    // Gastronomy & Royal Banqueting per plate in INR
    let cateringPerGuest = 1200; // ₹1,200 / plate
    if (gastronomyLevel === 'michelin') cateringPerGuest = 2200; // ₹2,200 / plate
    if (gastronomyLevel === 'royal') cateringPerGuest = 3800; // ₹3,800 / plate
    const cateringTotal = guests * cateringPerGuest;

    // Floral Couture & Mandap Architecture in INR
    let floralPerGuest = 500;
    let baseFloral = 150000;
    if (floralLevel === 'luxe') {
      floralPerGuest = 1200;
      baseFloral = 350000;
    }
    if (floralLevel === 'couture') {
      floralPerGuest = 2400;
      baseFloral = 750000;
    }
    const floralTotal = guests * floralPerGuest + baseFloral;

    // Iconic Indian Spectacle Add-ons in INR
    let addonsTotal = 0;
    const addOnList = [];
    if (hasPyrotechnics) {
      addonsTotal += 180000; // ₹1.8 Lakhs
      addOnList.push({ name: 'Cold Pyro & Fireworks', cost: 180000 });
    }
    if (hasDroneShow) {
      addonsTotal += 450000; // ₹4.5 Lakhs
      addOnList.push({ name: '300-Drone Aerial Show', cost: 450000 });
    }
    if (hasAviationConcierge) {
      addonsTotal += 380000; // ₹3.8 Lakhs
      addOnList.push({ name: 'Private Aircraft & VIP Motorcade', cost: 380000 });
    }

    const subtotal = baseProduction + cateringTotal + floralTotal + addonsTotal;
    const managementFee = Math.round(subtotal * 0.10); // 10% Governance Fee
    const grandTotal = subtotal + managementFee;

    const lowerBound = Math.round(grandTotal * 0.92);
    const upperBound = Math.round(grandTotal * 1.12);

    res.json({
      success: true,
      data: {
        breakdown: {
          productionArchitecture: baseProduction,
          gastronomyAndSommelier: cateringTotal,
          floralAndScenicArt: floralTotal,
          curatedAddons: addonsTotal,
          managementAndGovernance: managementFee
        },
        addons: addOnList,
        guestCount: guests,
        eventType,
        tierSummary: `${productionTier.toUpperCase()} Production with ${gastronomyLevel.toUpperCase()} Gastronomy`,
        estimatedTotal: grandTotal,
        currency: 'INR',
        rangeFormatted: `${formatINR(lowerBound)} - ${formatINR(upperBound)}`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Inquiries / Consultation Bookings (MERN CRUD)
app.post('/api/inquiries', async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      eventType, 
      guestCount, 
      targetDate, 
      location, 
      estimatedBudget, 
      visionDetails, 
      servicePreferences 
    } = req.body;

    if (!fullName || !email || !eventType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide full name, email, and event classification.' 
      });
    }

    const isVip = estimatedBudget?.includes('Crore') || estimatedBudget?.includes('50,00,000');

    let savedRecord;

    if (dbConnected) {
      const newInquiry = new Inquiry({
        fullName,
        email,
        phone: phone || 'Unspecified',
        eventType,
        guestCount: guestCount || 200,
        targetDate: targetDate || 'Flexible 2025/2026',
        location: location || 'Udaipur / Flexible',
        estimatedBudget: estimatedBudget || '₹50 Lakhs+',
        visionDetails: visionDetails || '',
        servicePreferences: servicePreferences || [],
        priority: isVip ? 'VIP Tier' : 'Standard'
      });
      savedRecord = await newInquiry.save();
    } else {
      savedRecord = {
        _id: 'inq-' + Date.now(),
        fullName,
        email,
        phone: phone || 'Unspecified',
        eventType,
        guestCount: guestCount || 200,
        targetDate: targetDate || 'Flexible 2025/2026',
        location: location || 'Udaipur / Flexible',
        estimatedBudget: estimatedBudget || '₹50 Lakhs+',
        visionDetails: visionDetails || '',
        servicePreferences: servicePreferences || [],
        status: 'New',
        priority: isVip ? 'VIP Tier' : 'Standard',
        createdAt: new Date()
      };
      inMemoryInquiries.unshift(savedRecord);
    }

    res.status(201).json({
      success: true,
      message: 'Consultation dossier received with honour. Our Senior Producer will connect with your family office within 12 hours.',
      data: savedRecord
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error creating inquiry.' });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    if (dbConnected) {
      const records = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: records.length, data: records });
    }
    res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch('/api/inquiries/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (dbConnected) {
      const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      if (updated) return res.json({ success: true, data: updated });
    }

    const item = inMemoryInquiries.find(i => i._id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    item.status = status;
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }
  res.json({
    success: true,
    message: 'Welcome to the LUMIÈRE Private Circle. Our biannual Royal Indian Gazette has been dispatched to your inbox.'
  });
});

// Serve static client assets in production
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('LUMIÈRE India Server is active.');
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 LUMIÈRE India Luxury Event Management Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = Number(PORT) + 1;
    console.warn(`Port ${PORT} in use, automatically binding to port ${nextPort}...`);
    app.listen(nextPort, () => {
      console.log(`🚀 LUMIÈRE India Luxury Event Management Server listening on port ${nextPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});

