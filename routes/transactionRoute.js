const express = require('express');
const Transaction = require('../models/Transactions'); // Import the User model
const BankAccount = require('../models/BankAccountSchema');
const router = express.Router();


//endpoint for adding a transaction
router.post('/create/:accountNumber', async(req,res)=>{
    try{
        const {amount, transactionType, description}=req.body;
        const accountNumber=req.params.accountNumber;

        //validate bank account

        const account=await BankAccount.findOne({accountNumber});
        if(!account){
            return res.status(404).json({message:"Account not found"});
        }

        //validate transaction type
        if(!['deposit', 'withdraw'].includes(transactionType)){
            return res.status(400).json({message:"Invalid transaction type"});
        }

        //validate amount
        if(amount<=0){
            return res.status(400).json({message:"Invalid amount"});
        }

        //handle withdraw

    

        if(transactionType=='withdraw' && account.balance<0){
            return res.status(400).json({message:"Insufficient balance"});
        }

        //update the account balance

        // // Update account balance
        // account.balance += type === 'deposit' ? amount : -amount;
        // await account.save();

        if(transactionType=='deposit'){
            account.balance+=amount;
            
        }
        else
        {
            account.balance-=amount;
            
        }

        await account.save();

            //save the new transaction

        const transaction= new Transaction({transactionType, amount, accountNumber: req.params.accountNumber, description})
        await transaction.save();

        res.status(201).json({ message: 'Transaction recorded successfully', transaction });


    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });

    }
})


//get transaction history

router.get('/:accountNumber', async(req,res)=>{
    try{

        const accountNumber=req.params.accountNumber;
        const transactions=await Transaction.find({accountNumber}).sort({date: -1});
        if(transactions.length==-1){
            return res.status(404).json({message:"No transaction found"});
        }
        res.status(200).json({accountNumber, transactions});

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });

    }
})

module.exports=router;