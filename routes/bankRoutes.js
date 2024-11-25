const express = require('express');
const BankAccount = require('../models/BankAccountSchema'); // Import the User model
const router = express.Router();

//create a bank account

router.post('/create', async(req,res)=>{
    try{
        const {accountHolderName, accountNumber, accountType, balance, currency}= req.body;

        const newAccount=new BankAccount({accountHolderName, accountNumber, accountType, balance, currency});
        await newAccount.save();
        res.status(201).json({message:'Bank account created successfully', newAccount});


    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to craete bank account', details: err.message})

    }
})

//get details using a bank account number

router.get('/:accountNumber', async(req,res)=>{
    try{
        const account=await BankAccount.findOne({accountNumber: req.params.accountNumber});
        if(!account){
            return res.status(404).json({message: 'Account not found'})
        }
        res.status(200).json(account);

    }
    catch{
        res.status(500).json({error: 'Failed to get account details'})

    }
})


//update bank account details
router.put('/:accountNumber', async (req,res)=>{
    try{
        const updates=req.body;
        const account= await BankAccount.findOneAndUpdate({accountNumber: req.params.accountNumber, updates, new:true})
        if(!account)
        {
            return res.status(404).json({error: 'Account not found'})

    }
    res.status(200).json(account);
}
    catch{
        res.status(500).json({error: 'Failed to update account details'})

    }
})



//deleting a account

router.delete('/:accountNumber', async(req,res)=>{
    try{
        const account=await BankAccount.findOneAndDelete({accountNumber: req.params.accountNumber});
        if(!account){
            return res.status(404).json({error: 'Account not found'})
        }
        res.status(200).json({message: 'Account deleted successfully'})

    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to delete account'})

    }
})

//route to get all bank accounts

router.get('/all', async(req,res)=>{
    try{
        const accounts=await BankAccount.find();
        if(accounts.length==0){
            return res.status(404).json({error: 'No accounts found'})
        }
        res.status(200).json({accounts});

    }

    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to fetch accounts'})

    }
})

module.exports = router;