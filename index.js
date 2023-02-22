const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');

const PORT = process.env.PORT || 5000;
const mongoUrl = `mongodb+srv://foxy:Keks2000@cluster0.kyefu8x.mongodb.net/authTest?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect(mongoUrl).then(() => {
            console.log(`Successfully connected to the DB`);
        }).catch((e) => {
            console.log(`Error to connecting the DB error no.: ${e}`);
        });
        app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();