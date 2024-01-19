import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const port = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URI;
const app = express();


//Middleware for parsing request body
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack');
})

// Route to save a new book
app.post('/books', async(req, res)=>{
try {
    if(
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
    ){
        return res.status(400).send({
message: 'Send all required fields: title, author, publishYear',
        });
    }
    const newBook={
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    return res.status(201).send(book);
    
} catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
}

});

//Route for get all books from database
app.get('/books', async (req, res) =>{
try {
    const books = await Book.find({ });
    return res.status(200).json({
        count: books.length,
        data: books
    });
} catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
}
});


//Route for get one book from database by id
app.get('/books/:id', async (req, res) =>{
try {
    const {id}= req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
} catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
}
});

mongoose.connect(mongoDBURL).then(() => {
console.log('App connected to database');

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});

}).catch((error) => {
console.log(error);
});