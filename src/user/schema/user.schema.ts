// blog.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({
        unique: true,
        type: String,
        required: true,
    })
    userName: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    mobile: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop({
        required: false,
        default: ''
    })
    code: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
