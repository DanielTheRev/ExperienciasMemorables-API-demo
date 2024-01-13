import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { ImgBGRoutes } from './routes/imgBackground.routes';
import { ServiceRouter } from './routes/service.routes';
import { NosotrosRouter } from './routes/nosotros.routes';
import { ContactMessagesRouter } from './routes/contactMessages.routes';
import { LoginRouter } from './routes/login.routes';

const app = express();

//* Configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

//* Middlewares
app.use(cors());
app.use(morgan('dev'));

//* Routes
app.use('/portfolio/demos/experienciasmemorables/api/services', ServiceRouter);
app.use('/portfolio/demos/experienciasmemorables/api/imgBackground', ImgBGRoutes);
app.use('/portfolio/demos/experienciasmemorables/api/NosotrosPage', NosotrosRouter);
app.use('/portfolio/demos/experienciasmemorables/api/ContactMessages', ContactMessagesRouter);
app.use('/portfolio/demos/experienciasmemorables/api/login', LoginRouter);

//* Start
export const server = () => {
	return app.listen(app.get('port'), () => {
		console.log(`Server listen on port: ${app.get('port')}`);
	});
};
