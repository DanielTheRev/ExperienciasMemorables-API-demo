import { connect } from 'mongoose';
import { INITIAL_CONFIG } from './config';

export const connectDB = async () => {
	try {
		await connect(INITIAL_CONFIG.MONGO_DB.path);
		return `DATABASE CONNECTED in ${INITIAL_CONFIG.MONGO_DB.production ? 'PRODUCTION' : 'DEVELOPMENT'} mode`;
	} catch (error) {
		console.log(error);
	}
};
