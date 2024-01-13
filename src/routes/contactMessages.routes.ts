import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/contactMessages.controller';
import { tokenValidation } from '../helpers/verifyToken';

export const ContactMessagesRouter = Router();

ContactMessagesRouter.get('/getMessages', tokenValidation, getMessages);
ContactMessagesRouter.post('/sendMessage', createMessage);
