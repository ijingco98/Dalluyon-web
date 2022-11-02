require('dotenv').config();

const express = require ('express');
const mongoose = require('mongoose');

const cors = require('cors');

const port = 8080;
const app = express();

app.use(cors())

app.use((request, response, next) => {
console.log(request.path, request.method)
next()
})

app.use(express.json())

const userRoutes = require('./routes/user');
app.use( '/api/user',userRoutes);

const studentsRoutes = require('./routes/students');
app.use( '/api/students',studentsRoutes);

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(8080, () => {
        console.log('Working on port and connected to db')
    })
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (request, response) => {
    response.json('welcome to the app!')
})