// blog.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { CategoryDto } from "../dto/category.dto";
import { Category } from "./category.schema";

@Schema({ timestamps: true })
export class Blog extends Document {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop({
        type: Types.ObjectId,
        ref: CategoryDto.name,
        required: true
    })
    blogCategory: Category;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
