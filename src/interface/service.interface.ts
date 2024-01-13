import { ImgCL } from './imgBackground.interface';

export interface Service {
	id?: string;
	name: string;
	icon: ImgCL;
	images: ImgCL[];
}
