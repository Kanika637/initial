const mongoose = require('mongoose');
const bankAccountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true , unique: true},
    accountHolderName: { type: String, required: true },
    balance: { type: Number, required: true , min: 0},
    currency: { type: String, required: true, default: 'INR' },
    accountType: { type: String, required: true , enum:['Savings', 'Current']},
});
const BankAccount = mongoose.model('BankAccount', bankAccountSchema);
module.exports = BankAccount;