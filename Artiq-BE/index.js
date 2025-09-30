// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const adminRoutes = require('./routes/adminRoutes');


// -------------------- MIDDLEWARES --------------------



// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder as static so images are accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------- ROUTES --------------------

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Artiq Backend');
});

// Import route files
const userRoutes = require('./routes/userRoutes');
const artworkRoutes = require('./routes/artworkRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/artworks', artworkRoutes);

// Mount admin routes
app.use("/api/admin", adminRoutes);

// -------------------- DATABASE CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'artiqDB',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');

    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// -------------------- ERROR HANDLING --------------------

// Catch all 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});
