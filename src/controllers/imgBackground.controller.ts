import { Request, Response } from 'express';
import { ImgBG } from '../interface/imgBackground.interface';
import ImgBGModel from '../models/imageBackground.model';
import { DeleteImage, UploadImage } from '../services/cloudinary.service';

export const getImagesBG = async (req: Request, res: Response) => {
	try {
		const images = await ImgBGModel.find();
			return res.json({ success: true, data: images, isEmpty: images.length <= 0 });
	} catch (error) {
		return res.json({
			success: false,
			data: null,
			message: 'Error al traer las imagenes'
		});
	}
};

export const AddImageBG = async (req: Request, res: Response) => {
	const files = req.files! as any[];
	const imagesSaved: ImgBG[] = [];
	for await (const [i, img] of files.entries()) {
		try {
			const imgName = img.original_name;
			const imgSaveCL = await UploadImage(img, imgName, 'imgBackground');
			const newImg = new ImgBGModel({
				src: imgSaveCL
			});

			const imgSaved = await newImg.save();
			imagesSaved.push(imgSaved);
			if (i + 1 === files.length) {
				return res.json({
					success: true,
					message: 'Todos las imagenes se han subido con exito',
					data: imagesSaved
				});
			}
		} catch (error) {
			return res.json({
				success: false,
				message: 'Error al subir una o más imagenes'
			});
		}
	}
};

export const DelImageBG = async (req: Request, res: Response) => {
	const imgID = req.params.id;
	const imgBG = await ImgBGModel.findById(imgID);
	if (!imgBG)
		return res.json({ success: false, message: 'No existe la imagen al parecer' });

	try {
		await DeleteImage(imgBG.src.public_id);
		await imgBG.deleteOne();

		return res.json({ success: true, message: 'Imagen eliminada con exito' });
	} catch (error) {
		return res.json({ success: false, message: 'Error al eliminar imagen' });
	}
};
