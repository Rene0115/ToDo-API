/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../app';

dotenv.config();
const uri = process.env.MONGODB_URI || ''
const database = () => {
  mongoose.connect(uri).then((value) => logger.info('database connected')).catch((err) => logger.info(err));
};

export default database;
