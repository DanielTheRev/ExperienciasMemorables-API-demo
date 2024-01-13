import { model, Schema } from 'mongoose';
import { Service } from '../interface/service.interface';

const ServiceSchema = new Schema<Service>({
	name: String,
	icon: {},
	images: [{}]
});

export default model<Service>('Service', ServiceSchema);
