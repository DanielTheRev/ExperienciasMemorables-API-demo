import { Request, Response } from 'express';
import ContactMessageModel from '../models/contactmessages.model';
import { ContactMessage } from '../interface/contactMessages.interface';

export const getMessages = async (req: Request, res: Response) => {
	try {
		const messages = await ContactMessageModel.find();

		return res.json({ data: messages, isEmpty: messages.length <= 0 });
	} catch (error) {
		return res.json({ message: 'Error al recuperar los  datos' });
	}
};

export const createMessage = async (req: Request, res: Response) => {
	const messageDTO: ContactMessage = req.body;

	try {
		const newMessage = new ContactMessageModel(messageDTO);

		await newMessage.save();

		return res.json({
			success: true,
			message: 'Gracias por elegirnos, en breve contestaremos su consulta.'
		});
	} catch (error) {
		res.json({
			success: false,
			message:
				'Ocurrio un error al conectar con el servidor, intentelo nuevamente mas tarde.'
		});
	}
};
