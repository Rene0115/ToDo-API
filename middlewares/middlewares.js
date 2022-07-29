import router from "../routes/index.routes.js";
import express from 'express';
import bodyParser from "body-parser";

const middleware = (app) =>{
    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    

}