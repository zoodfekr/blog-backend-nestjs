// blog.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";


export enum LogType {
    Error = 'error',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    GET = "GET"
}


@Schema({ timestamps: true })
export class Log extends Document {
    @Prop()
    type: LogType;
    @Prop()
    url: string;
    @Prop()
    content: string;
    @Prop()
    user: string;

}

export const LogSchema = SchemaFactory.createForClass(Log);
