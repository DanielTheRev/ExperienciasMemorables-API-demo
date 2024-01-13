import { v2 as cloudinary } from 'cloudinary';
import { INITIAL_CONFIG } from '../config';
import path from 'path';
import DataURIParser from 'datauri/parser';
import { ImgCL } from '../interface/imgBackground.interface';

//* Configuration
cloudinary.config({
	cloud_name: INITIAL_CONFIG.Cloudinary.cloud_name,
	api_key: INITIAL_CONFIG.Cloudinary.api_key,
	api_secret: INITIAL_CONFIG.Cloudinary.api_secret
});

export const UploadImage = async (
	file: Express.Multer.File,
	id: string,
	folder: string
) => {
	const parser = new DataURIParser();
	const extName = path.extname(file.originalname).toString();
	const file64 = parser.format(extName, file.buffer);

	const img_uploaded = await cloudinary.uploader.upload(file64.content!, {
		public_id: id,
		overwrite: true,
		folder: folder
	});

	return img_uploaded;
};

export const DeleteImage = async (publicID: string) => {
	return cloudinary.uploader.destroy(publicID);
};
