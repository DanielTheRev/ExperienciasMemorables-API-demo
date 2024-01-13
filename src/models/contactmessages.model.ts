import { Schema, model } from 'mongoose';
import { ContactMessage } from '../interface/contactMessages.interface';

const ContactMessagesSchema = new Schema<ContactMessage>({
	nombre: String,
	correo: String,
	message: String,
	date: String
});

export default model<ContactMessage>('ContactMessage', ContactMessagesSchema);
