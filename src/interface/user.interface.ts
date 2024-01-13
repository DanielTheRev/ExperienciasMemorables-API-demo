import { Model } from 'mongoose';

export interface User {
	_id?: string;
	username: string;
	password: string;
}
export interface UserModel extends Model<User>, User {
	encryptPassword: (password: string) => Promise<any>;
	comparePassword: (password: string, receivedPassword: string) => Promise<any>;
}