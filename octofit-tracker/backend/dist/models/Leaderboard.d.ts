import mongoose, { Document } from 'mongoose';
export interface ILeaderboard extends Document {
    user: mongoose.Types.ObjectId;
    team?: mongoose.Types.ObjectId;
    totalCaloriesBurned: number;
    activitiesCount: number;
    averageDuration: number;
    rank: number;
    score: number;
    period: 'weekly' | 'monthly' | 'allTime';
    updatedAt: Date;
}
declare const _default: mongoose.Model<ILeaderboard, {}, {}, {}, Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map