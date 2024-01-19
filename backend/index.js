import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const port = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URI;
const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack');
})



mongoose.connect(mongoDBURL).then(() => {
console.log('App connected to database');

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});

}).catch((error) => {
console.log(error);
});