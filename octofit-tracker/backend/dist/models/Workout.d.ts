import mongoose, { Document } from 'mongoose';
export interface IWorkout extends Document {
    name: string;
    description: string;
    exercises: {
        name: string;
        sets: number;
        reps: number;
        duration?: number;
    }[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedDuration: number;
    targetMuscles: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map