import express, { Express, Request, Response } from 'express';
import './config/database';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';
import teamsRouter from './routes/teams';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app: Express = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Environment-aware base URL
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    baseUrl,
    endpoints: {
      users: `${baseUrl}/api/users`,
      activities: `${baseUrl}/api/activities`,
      teams: `${baseUrl}/api/teams`,
      leaderboard: `${baseUrl}/api/leaderboard`,
      workouts: `${baseUrl}/api/workouts`,
    },
  });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🏋️ OctoFit Tracker API running at ${baseUrl}`);
  console.log(`Base URL: ${baseUrl}`);
});
