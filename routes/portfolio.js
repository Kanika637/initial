const express = require('express');
const BankAccount = require('../models/BankAccountSchema'); // Import the User model
const Portfolio=require('../models/portfolio');
const router = express.Router();



//create a portfolio

router.post('/:accountNumber/create-portfolio', async(req,res)=>{
    try{
        const {investments}=req.body;

        const accountNumber=req.params.accountNumber;

        const account=await BankAccount.findOne({accountNumber});
        if(!account){
            return res.status(404).json({message:"Account not found"});
        }

        //calculate the total value

        const totalValue=investments.reduce((sum, investment)=> {
            return sum+investment.amount}, 0);

        //create the portfolio

        const portfolio=new Portfolio({investments, accountNumber, totalValue});
        await portfolio.save();
        res.status(200).json({message:'Portfolio created'})

        

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Internal server error'})

    }
})


//create an investment

router.post('/:accountNumber/add-investment', async(req,res)=>{
    try{
        const {assetType, assetName, amount, riskLevel}=req.body;

        

        const portfolio=await Portfolio.findOne({accountNumber: req.params.accountNumber})
        if(!portfolio){
            return res.status(404).json({message:"Portfolio not found"});
        }

        portfolio.investments.push({assetName, assetType, amount, riskLevel});
        portfolio.totalValue+=amount;

        await portfolio.save();

        res.status(200).json({message:'New investment added'});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Internal server error'})

    }
})

// remove investment from portfolio

router.delete('/:accountNumber/remove-investment/:investmentId', async(req,res)=>{
    try{
        const{accountNumber,investmentId}=req.params;

        // Validate portfolio
        const portfolio = await Portfolio.findOne({ accountNumber });
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        const investment=portfolio.investments.id(investmentId);
        if(!investment){
            return res.status(404).json({message:"Investment not found"});
        }

        portfolio.totalValue=portfolio.totalValue-investment.amount;
        portfolio.investments.pull(investmentId);
        // investment.pull();
        await portfolio.save();

        res.status(200).json({ message: "Investment removed successfully", portfolio });

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });

    }
})

//view portfolio value

router.get('/:accountNumber/portfolio-value', async(req,res)=>{
    try{
        const accountNumber=req.params.accountNumber;

        const portfolio=await Portfolio.findOne({accountNumber});
        if(!portfolio){
            return res.status(404).json({message:"Portfolio not found"});
        }

        res.status(200).json({totalValue:portfolio.totalValue});

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });

    }
})

module.exports=router;