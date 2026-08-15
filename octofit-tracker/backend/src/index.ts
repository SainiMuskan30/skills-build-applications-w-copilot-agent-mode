import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker API' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
