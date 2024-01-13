import { model, Schema } from 'mongoose';
import { ImgBG } from '../interface/imgBackground.interface';

const ImgBackgroundSchema = new Schema<ImgBG>({
	src: {}
});

export default model<ImgBG>('ImgBackground', ImgBackgroundSchema);
