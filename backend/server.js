const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const pingmydyno = require('pingmydyno') ;


const app = express();
const port = process.env.PORT || 5000;
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


app.use(cors());
app.use(express.json());



const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB db connection established successfully');
});
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter)

app.listen(port, () => {
    // console.log(`Server running on port: ${port}`);
    pingmydyno('https://my-exercises-tracker.herokuapp.com/');
})