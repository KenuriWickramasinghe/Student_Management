const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');

require('dotenv').config();

const PORT = process.env.PORT || 8070;
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('Mongodb Connection Success!');
});

const studentRouter = require('./routes/students.js');

app.use('/student', studentRouter);

const users = require('./routes/api/users');
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
// Routes
app.use('/api/users', users);

app.listen(PORT, () => {
	console.log('Server is up and running on port');
});
