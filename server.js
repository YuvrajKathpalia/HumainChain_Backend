const express = require('express');
const connect = require('./config/database');
require('dotenv').config();


connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/incidents', require('./routes/incidents'));

//test
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AI Safety Incident Log API' });
});

//error
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;