import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    username: string;
    email: string;
    passwordHash: string;
    profile: {
        firstName?: string;
        lastName?: string;
        bio?: string;
        profilePicture?: string;
    };
    team?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map