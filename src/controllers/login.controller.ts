import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import { INITIAL_CONFIG } from '../config';

interface UserDTO {
	username: string;
	password: string;
}

export const registerUser = async (req: Request, res: Response) => {
	const userDTO = req.body as UserDTO;
	try {
		const newUser = new UserModel(userDTO);
		newUser.password = await UserModel.encryptPassword(userDTO.password);
		await newUser.save();
		return res.json({ status: 'success' });
	} catch (error) {
		return res.status(500).json({ message: 'Error al crear usuario' });
	}
};

export const LogIn = async (req: Request, res: Response) => {
	const userDTO = req.body as { username: string; password: string };
	const user = await UserModel.findOne({ username: userDTO.username });
	if (!user) {
		return res.json({
			success: false,
			message: 'No existe usuario o contraseña incorrecta'
		});
	}
	const matchPassword = await UserModel.comparePassword(userDTO.password, user.password);

	if (matchPassword) {
		const token = jwt.sign({ userID: user.id }, INITIAL_CONFIG.SECRET_KEY, {
			expiresIn: '10 hrs'
		});

		return res.json({
			success: true,
			token
		});
	}

	return res.json({
		success: false,
		message: 'No existe usuario o contraseña incorrecta'
	});
};

export const VerifyUserToken = async (req: Request, res: Response) => {
	const token = req.body.token;
	if (!token) return res.json({ valid: false });

	try {
		const decoded = jwt.verify(token, INITIAL_CONFIG.SECRET_KEY) as { userID: string };
		const user = await UserModel.findById(decoded.userID);
		setTimeout(() => {
			return res.json({ valid: Boolean(user) });
		}, 10000);
	} catch (error) {
		return res.json({ valid: false });
	}
};
