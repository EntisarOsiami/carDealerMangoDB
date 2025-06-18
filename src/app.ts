import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { port } from './utils/helpers';
import carDealersRoutes from './routes/carDealer.routes';
import carMakerRoutes from './routes/carMake.routes';
import carRoutes from './routes/car.routes';
import { databaseConnection } from './config/database';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
databaseConnection().catch(console.error);


  app.use('/api/carDealers', carDealersRoutes);  
  app.use('/api/carMakers', carMakerRoutes);
  app.use('/api/cars', carRoutes);


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'car dealer api' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false,
    error: `Not Found - ${req.url}` 
  });
});


app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});

