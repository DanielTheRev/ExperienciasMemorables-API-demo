import { Router } from 'express';
import * as imgBGController from '../controllers/imgBackground.controller';
import multer from 'multer';
import { tokenValidation } from '../helpers/verifyToken';

export const ImgBGRoutes = Router();
ImgBGRoutes.use(multer().array('imgFile'));

ImgBGRoutes.get('/getImagesBackground', imgBGController.getImagesBG);
ImgBGRoutes.post('/AddImagesBackground', tokenValidation, imgBGController.AddImageBG);
ImgBGRoutes.delete('/deleteImageBackgound/:id', tokenValidation, imgBGController.DelImageBG);
