import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div>
      <h2 style={styles.heading}>Your Expenses</h2>
      <ul style={styles.list}>
        {expenses.map((expense) => (
          <li key={expense._id} style={styles.item}>
            <span style={styles.description}>{expense.description}</span>
            <span style={styles.amount}>₹{expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#444',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontSize: '16px',
  },
  description: {
    color: '#333',
  },
  amount: {
    fontWeight: 'bold',
    color: '#3b82f6',
  },
};

export default ExpenseList;
