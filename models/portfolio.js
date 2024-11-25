const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true }, // Bank account reference
    investments: [
        {
            assetType: { type: String, required: true }, // e.g., "stock", "bond", "mutual fund"
            assetName: { type: String, required: true }, // e.g., "AAPL", "Gold ETF"
            amount: { type: Number, required: true },
            riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], required: true }, // Risk category
        },
    ],
    totalValue: { type: Number, default: 0 }, // Total value of the portfolio
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
