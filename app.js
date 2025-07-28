// 📁 app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', authRoutes);
app.use('/api/expenses', expenseRoutes);
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(err => console.error('DB connection error:', err));

