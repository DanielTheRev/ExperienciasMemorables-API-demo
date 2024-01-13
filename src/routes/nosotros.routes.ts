import { Router } from 'express';
import multer from 'multer';
import { EditProperty, GetNosotrosData, updateImage } from '../controllers/nosotros.controller';
import { tokenValidation } from '../helpers/verifyToken';

export const NosotrosRouter = Router();

NosotrosRouter.get('/getNosotrosData', GetNosotrosData);
NosotrosRouter.post('/editProperty', tokenValidation, EditProperty);
NosotrosRouter.post('/editImage', tokenValidation, multer().single('image'), updateImage);
