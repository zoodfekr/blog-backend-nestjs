// blog.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Category } from "./category.schema";
import { User } from "src/user/schema/user.schema";

@Schema({ timestamps: true })
export class Blog extends Document {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    image: string;

    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true
    })
    Author: string;

    @Prop({
        type: Types.ObjectId,
        ref: Category.name,
        required: true
    })
    category: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
