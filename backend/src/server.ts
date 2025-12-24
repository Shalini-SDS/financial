import { config } from 'dotenv';
import { createApp } from './app';

config();

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const app = createApp();

app.listen(port, () => {
  console.log(`InvoSure API listening on ${port}`);
});

