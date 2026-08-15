import { Request, Response } from 'express';
export declare const getWorkouts: (req: Request, res: Response) => Promise<void>;
export declare const getWorkoutById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createWorkout: (req: Request, res: Response) => Promise<void>;
export declare const updateWorkout: (req: Request, res: Response) => Promise<void>;
export declare const deleteWorkout: (req: Request, res: Response) => Promise<void>;
export declare const getWorkoutsByDifficulty: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=workoutController.d.ts.map