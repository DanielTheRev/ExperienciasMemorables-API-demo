import { server } from './app';
import { connectDB } from './database';

connectDB()
	.then((res) => {
		console.log(res);
	})
	.catch((error) => console.log(error));

server();
