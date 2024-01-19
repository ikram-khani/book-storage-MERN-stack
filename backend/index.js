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



app.get('/', async (req, res) => {
    try {
      // Fetch all books from the database
      const allBooks = await Book.find({});
      
      // Send the list of books as a response
      return res.status(200).json({
        count: allBooks.length,
        data: allBooks
      });
    } catch (error) {
      console.error('Error fetching books', error);
      return res.status(500).send('Internal Server Error');
    }
  });

//middleware for routing
app.use('/books', booksRoute);
app.use('/users', userRoutes);

mongoose.connect(mongoDBURL).then(() => {
console.log('App connected to database');

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});

}).catch((error) => {
console.log(error);
});