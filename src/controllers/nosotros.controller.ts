import { Request, Response } from 'express';
import NosotrosModel from '../models/nosotros.model';
import { UploadImage } from '../services/cloudinary.service';

export const GetNosotrosData = async (req: Request, res: Response) => {
	const nosotros = await NosotrosModel.find();
	if (nosotros.length <= 0) {
		const newData = new NosotrosModel({
			frase: '',
			presentacion: '',
			imageUrl: {}
		});

		const DataSaved = await newData.save();
		return res.json(DataSaved);
	}
	return res.json(nosotros[0]);
};

export const EditProperty = async (req: Request, res: Response) => {
	const id = req.body.id;
	// const frase = req.body.frase;
	const property = req.body.property as 'frase' | 'presentacion';
	const value = req.body.value;

	const NosotrosData = await NosotrosModel.findById(id);
	if (!NosotrosData) {
		return res.json({ success: false, message: 'Error al recuperar datos' });
	}

	try {
		if (NosotrosData[property]) {
			NosotrosData[property] = value;
		}

		await NosotrosData.save();

		return res.json({ success: true, message: `${property} actualizada con exito` });
	} catch (error) {
		return res.json({ success: false, message: `Error al actualizar ${property}` });
	}
};

export const updateImage = async (req: Request, res: Response) => {
	const id = req.body.id as any;
	const file = req.file;
	const NosotrosData = await NosotrosModel.findById(id);

	if (!NosotrosData) {
		return res.json({ message: 'Error al buscar los datos', success: false });
	}

	try {
		const imageCLD = await UploadImage(file!, id, 'Nosotros/image');

		NosotrosData.imageUrl = imageCLD as any;
		await NosotrosData.save();

		return res.json({
			message: 'Imagen actualizada con exito',
			success: true,
			imageRef: imageCLD
		});
	} catch (error) {
		return res.json({ sucess: false, message: 'Error al actualizar imagen' });
	}
};
