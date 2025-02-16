import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
    name: string;
    description: string;
    createdAt: Date;
}

const ResourceSchema = new Schema<IResource>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IResource>("Resource", ResourceSchema);
