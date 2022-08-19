const express = require('express');
const app = express();

const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { });

