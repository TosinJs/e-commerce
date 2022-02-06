import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true})
export class Product {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
    owner: string;

    @Prop()
    title: string;

    @Prop({ default: false })
    description: string;

    @Prop()
    image: string;

    @Prop()
    price: number;
}

export const Productschema = SchemaFactory.createForClass(Product)