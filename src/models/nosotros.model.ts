import { model, Schema } from 'mongoose';
import { Nosotros } from '../interface/nosotros.interface';

const NosotrosSchema = new Schema<Nosotros>({
	frase: String,
	presentacion: String,
	imageUrl: {
		type: {},
		default: {}
	}
});

export default model<Nosotros>('Nosotros', NosotrosSchema);
