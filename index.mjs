import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import * as config from './config.mjs';
import './passport.mjs';

import userRoute from './rest/user/user.route.mjs';
import articleRoute from './rest/article/article.route.mjs';
import authRoute from './auth.mjs';

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to ZeptoBook Product app" });
});

authRoute(app);
userRoute(app);
articleRoute(app);

app.listen(config.port, () => console.log(`Server started on port ${config.port}!`))