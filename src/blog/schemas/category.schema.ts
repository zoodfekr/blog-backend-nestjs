// blog.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Category extends Document {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
