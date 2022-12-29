require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const expensesRouter = require('./routes/expenses.js');
var cors = require('cors')
const app = express();


mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xmntbhs.mongodb.net/expenseDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Mongoose connected successfully")
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}
connectDB()


app.use(cors())
app.use(express.json())
app.use("/api/expenses", expensesRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})