const express = require('express');
const connectDB = require('./db'); // Import DB connection
const app = express();
const userRoutes = require('./routes/userRoutes'); 
const bankRoutes=require('./routes/bankRoutes');
const transactionRoutes=require('./routes/transactionRoute');
const portfolioRoutes=require('./routes/portfolio')



// Middleware to parse JSON requests
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Connect to database
connectDB();

// Register the user router
app.use('/users', userRoutes);

// Register the bank account routes
app.use('/account',bankRoutes);

// Register the transaction routes
app.use('/transactions',transactionRoutes);

// Register the portfolio routes
app.use('/portfolio',portfolioRoutes);



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});






