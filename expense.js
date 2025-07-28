// routes/expense.js

const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// CREATE a new expense
router.post('/expenses', async (req, res) => {
  const { amount, description, category } = req.body;
  try {
    const expense = await Expense.create({ amount, description, category });
    res.status(201).json(expense);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ message: 'Error creating expense' });
  }
});

// READ all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// UPDATE an expense
router.put('/editexpense/:id', async (req, res) => {
  const { amount, description, category } = req.body;
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (expense) {
      expense.amount = amount;
      expense.description = description;
      expense.category = category;
      await expense.save();
      res.json(expense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Error updating expense' });
  }
});

// DELETE an expense
router.delete('/expenses/:id', async (req, res) => {
  try {
    const deleted = await Expense.destroy({ where: { id: req.params.id } });
    res.json({ deleted });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

module.exports = router;
