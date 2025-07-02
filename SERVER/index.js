const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const expenseRoutes = require('./routes/expenseRoutes'); // 👈 added

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use expense routes
app.use('/api/expenses', expenseRoutes); // 👈 added

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

