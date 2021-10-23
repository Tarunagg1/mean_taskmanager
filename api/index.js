require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./config/db');
const api = require('./routes/api')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('dev'));

app.use('/api',api);


const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log('Server listning at', PORT);
})












