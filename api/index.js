require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./config/db');
const api = require('./routes/api')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,x-refresh-token,_id');

    res.header(
        'Access-Control-Expose-Headers',
        'x-refresh-token,x-access-token'
    );
    next();
})

app.use(morgan('dev'));

app.use('/api', api);


const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log('Server listning at', PORT);
})












