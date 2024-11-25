const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true , unique: true},
    transactionType: { type: String , enum:['withdraw', 'deposit'], required: true },
    date: { type: Date, required: true, default:Date.now},
    amount: { type: Number, required: true},
    description: { type: String, required: true},
});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;