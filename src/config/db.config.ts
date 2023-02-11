import mongoose from 'mongoose';
import logger from '../app';


const uri = process.env.MONGODB_URI || ''
const database = () => {
  mongoose.set('strictQuery',true);
  mongoose.connect(uri).then((value) => logger.info('database connected')).catch((err) => logger.info(err));
};

export default database;
