import { config } from 'dotenv';
config();

if (!process.env.SECRET_KEY) {
	throw new Error('no secret key funded in env');
}

export const INITIAL_CONFIG = {
	MONGO_DB: {
		path: process.env.DB_URI || 'mongodb://127.0.0.1:27017/ExperienciasMemorables-demo',
		production: Boolean(process.env.DB_URI)
	},
	SECRET_KEY: process.env.SECRET_KEY,
	Cloudinary: {
		cloud_name: process.env.CL_NAME,
		api_key: process.env.CL_API_KEY,
		api_secret: process.env.CL_API_SECRET
	}
};
