import { Request, Response } from 'express';
export declare const getLeaderboard: (req: Request, res: Response) => Promise<void>;
export declare const getUserRank: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateLeaderboard: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=leaderboardController.d.ts.map