import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './database/mongoConnect.js';
import authRouter from './routes/auth.routes.js';
import typesRouter from './routes/type.routes.js';
import roomsRouter from './routes/room.routes.js';
import utilitiesRouter from './routes/utility.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.disable('x-powered-by');

const port = process.env.PORT || 8000;

app.get('/api', (req, res) => {
  res.status(200).json('Server up');
});

app.use('/api/auth', authRouter);
app.use('/api/types', typesRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/utilities', utilitiesRouter);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    } catch (err) {
      console.error('Cannot connect to server: ' + err);
    }
  })
  .catch((err) => {
    console.error('Cannot connect to the database: ' + err);
  });