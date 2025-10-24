// blog.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Category extends Document {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    image: string;

    @Prop({
        type: Types.ObjectId,
        ref: Category.name,
        required: true
    })
    auther: string
}

export const CategorySchema = SchemaFactory.createForClass(Category);
