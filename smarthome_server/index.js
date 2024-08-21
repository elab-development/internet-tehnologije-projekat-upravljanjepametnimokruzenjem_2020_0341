import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './database/mongoConnect.js';

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