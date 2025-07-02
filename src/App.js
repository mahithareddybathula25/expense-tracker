import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch all expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add or update an expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    try {
      if (editingId) {
        await axios.put(`http://localhost:5001/api/expenses/${editingId}`, {
          title,
          amount,
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5001/api/expenses', {
          title,
          amount,
        });
      }
      setTitle('');
      setAmount('');
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setEditingId(expense._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const totalAmount = expenses.reduce((total, exp) => total + Number(exp.amount), 0);

  return (
    <div className="container">
      <h1>💸 Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">{editingId ? 'Update Expense' : 'Add Expense'}</button>
      </form>

      <h2>Expenses:</h2>
      {expenses.map((expense) => (
        <div key={expense._id} className="expense">
          <span>{expense.title}</span>
          <span>₹{expense.amount}</span>
          <div>
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense._id)}>Delete</button>
          </div>
        </div>
      ))}

      <h2 style={{ marginTop: '20px', color: '#4a0072' }}>
        Total Spent: ₹{totalAmount}
      </h2>
    </div>
  );
}

export default App;
