import { model, Schema } from 'mongoose';
import { User, UserModel } from '../interface/user.interface';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema<User>(
	{
		username: String,
		password: String
	},
	{
		versionKey: false
	}
);

UserSchema.statics.encryptPassword = async (Password) => {
	return await bcrypt.hash(Password, 10);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword);
};

export default model<User, UserModel>('User', UserSchema);
