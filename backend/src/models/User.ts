import { model, Model, Schema, Document } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    username?: string;
    createdAt: Date;
}

const UserSchema = new Schema<User>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, sparse: true, unique: true },
}, {
    timestamps: true  
});

export const UserModel: Model<User> = model<User>("Users", UserSchema);