import { Router } from 'express';
import multer from 'multer';
import { AddService, DeleteImgFromService, DeleteService, GetServices, UpdateService } from '../controllers/service.controller';
import { tokenValidation } from '../helpers/verifyToken';

export const ServiceRouter = Router();

ServiceRouter.use(multer().fields([{ name: 'icon' }, { name: 'images' }]));
ServiceRouter.get('/getServices', GetServices);
ServiceRouter.post('/addService', tokenValidation, AddService);
ServiceRouter.post('/updateService', tokenValidation, UpdateService);
ServiceRouter.delete('/deleteService/:id', tokenValidation, DeleteService);
ServiceRouter.delete('/deleteImgFromService/:serviceID/:imgID', tokenValidation, DeleteImgFromService);
