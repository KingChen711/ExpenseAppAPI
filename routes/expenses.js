require('dotenv').config()
const express = require('express')
const router = express.Router();


const Expense = require('../models/Expense.js');


router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json({ success: true, expenses })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
})


router.post('/', async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const newExpense = new Expense({ name, amount, date });
    await newExpense.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
})


router.put('/:expenseId', async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const foundExpense = await Expense.findOneAndUpdate(
      {
        _id: req.params.expenseId
      },
      {
        name,
        amount,
        date
      },
      {
        new: true
      });
    if (!foundExpense) res.status(400).json({ success: false, message: `not found any expense with id ${req.params.expenseId}` })
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Interval Server Error" })
  }
})


router.delete('/:expenseId', async (req, res) => {
  try {
    const foundExpense = await Expense.findOneAndDelete({ _id: req.params.expenseId });
    if (!foundExpense) res.status(400).json({ success: false, message: `not found any expense with id ${req.params.expenseId}` });
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: "Interval Server Error" })
  }
})


module.exports = router;