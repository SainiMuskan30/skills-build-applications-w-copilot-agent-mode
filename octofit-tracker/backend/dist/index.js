"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const activities_1 = __importDefault(require("./routes/activities"));
const teams_1 = __importDefault(require("./routes/teams"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const port = 8000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS middleware
app.use((req, res, next) => {
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
app.get('/', (req, res) => {
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
app.use('/api/users', users_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(port, () => {
    console.log(`🏋️ OctoFit Tracker API running at ${baseUrl}`);
    console.log(`Base URL: ${baseUrl}`);
});
//# sourceMappingURL=index.js.map