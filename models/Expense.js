const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: String,
})

module.exports = mongoose.model("Expense", expensesSchema);