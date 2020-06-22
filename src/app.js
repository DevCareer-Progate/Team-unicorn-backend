import express from 'express';

const app = express();

import userRoute from '../routes/user.route';
import profileRoute from '../routes/profile.route';

import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = process.env.DATABASE_URI;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err))

// entry index enpoints
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'This is the index page endpoint'
    }).status(200);
})

app.use('/', userRoute);
app.use('/', profileRoute)

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`The server is listen on PORT ${PORT}`);
})