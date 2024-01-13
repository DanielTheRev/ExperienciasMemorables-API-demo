import { Request, Response } from 'express';
import ServiceModel from '../models/service.model';
import { ImgCL } from '../interface/imgBackground.interface';
import { DeleteImage, UploadImage } from '../services/cloudinary.service';
import serviceModel from '../models/service.model';

export const GetServices = async (req: Request, res: Response) => {
	try {
		const services = await ServiceModel.find();
		return res.json({ success: true, data: services, isEmpty: services.length <= 0 });
	} catch (error) {
		return res.json({
			success: false,
			data: null,
			message: 'Error al recuperar datos del servidor'
		});
	}
};

export const AddService = async (req: Request, res: Response) => {
	console.log('ADD SERVICE REQUEST');
	const files = req.files as any;
	const dataRaw = req.body as any;
	const name = dataRaw.name;
	const icon = files.icon[0];
	const images = files.images;
	let iconCLD: any = {};
	const imagesCLD: any[] = [];
	try {
		iconCLD = await UploadImage(icon, name, `serviceIcons/${name}`);

		if (images) {
			for await (const [i, img] of images.entries()) {
				const imgName = img.originalname;
				const image = await UploadImage(img, imgName, `serviceImgs/${name}`);
				imagesCLD.push(image);
			}
		}
		const service = new ServiceModel({
			name,
			icon: iconCLD,
			images: imagesCLD
		});

		const serviceSaved = await service.save();
		console.log('ADD SERVICE REQUEST END SUCCESSFULL');
		return res.json({ success: true, data: serviceSaved });
	} catch (error) {
		console.log('ADD SERVICE REQUEST END WITH ERROR');
		return res.json({ success: false, message: error });
	}
};

export const UpdateService = async (req: Request, res: Response) => {
	console.log('UPDATE SERVICE REQUEST');
	const files = req.files as any;
	const dataRaw = req.body as any;
	const name = dataRaw.name;
	const icon = files.icon ? files.icon[0] : undefined;
	const images = files.images;
	let iconCLD: any = {};
	const imagesCLD: any[] = [];
	console.log(dataRaw);
	try {
		const service = await serviceModel.findById(dataRaw._id);

		if (!service)
			return res.json({ success: false, message: 'Error al buscar servicio' });
		if (name) {
			service.name = name;
		}
		if (icon) {
			await DeleteImage(service.icon.public_id);
			service.icon = (await UploadImage(icon, name, `serviceIcons/${name}`)) as any;
		}
		if (images) {
			for await (const [i, img] of images.entries()) {
				const imgName = img.originalname;
				const image = await UploadImage(img, imgName, `serviceImgs/${name}`);
				imagesCLD.push(image);
			}
		}
		service.images = [...service.images, ...imagesCLD];
		const serviceUpdated = await service.save();

		return res.json({
			success: true,
			message: 'Servicio actualizado con exito',
			data: serviceUpdated
		});
	} catch (error) {
		console.log(error);
		return res.json({
			success: false,
			message: 'Error al actualizar servicio'
		});
	}
};

export const DeleteImgFromService = async (req: Request, res: Response) => {
	try {
		const data = req.params as { serviceID: string; imgID: string };
		const service = await serviceModel.findById(data.serviceID);
		if (!service)
			return res.json({ success: false, message: 'Error al buscar el servicio' });

		const image = service.images.find((img) => img.asset_id === data.imgID);
		if (!image)
			return res.json({ success: false, message: 'No se encontro la imagen' });

		await DeleteImage(image.public_id);
		service.images = service.images.filter((e) => e.asset_id !== data.imgID);

		await service.save();
		return res.json({
			success: true,
			message: `Imagen eliminada de ${service.name} con exito`
		});
	} catch (error) {
		return res.json({
			success: false,
			message: 'hubo un error al eliminar imagen del servicio'
		});
	}
};

export const DeleteService = async (req: Request, res: Response) => {
	return res.json({ message: 'Construyendo' });
};
