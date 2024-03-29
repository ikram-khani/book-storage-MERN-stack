import express, { response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';

import cors from 'cors';

const port = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URI;
const app = express();
import userRoutes from './routes/userRoutes.js';
//middleware for handling cors policy
app.use(cors());


//Middleware for parsing request body
app.use(express.json());



app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack');
})

//middleware for routing
app.use('/books', booksRoute);
app.use('/users', userRoutes);

mongoose.connect('mongodb+srv://ikr302000:32WzigXcCxd8XPF@cluster0.q5liuvd.mongodb.net/books-collection?retryWrites=true&w=majority').then(() => {
console.log('App connected to database');

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});

}).catch((error) => {
console.log(error);
});