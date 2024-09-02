const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db.js');
const itemRoutes = require('./routes/item.js');

const app = express();
connectDB();

const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, '../Frontend')));

app.use(express.json());
app.use('/api', itemRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
