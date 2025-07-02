const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create Expense
router.post('/', async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newExpense = new Expense({ title, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense' });
  }
});

// Read All Expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// Update Expense
router.put('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, amount: req.body.amount },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Error updating expense' });
  }
});

// Delete Expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

module.exports = router;
