import router from "../routes/index.routes.js";
import express from 'express';
import bodyParser from "body-parser";
import database from "../config/db.config.js";
import errorHandler from './error.middleware.js';
const middleware = (app) =>{
    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    database();
    app.use('*', (req, res) =>{
        res.status(200).send('Server is Running Check API docs')
    });
    app.use(errorHandler);

};

export default middleware;