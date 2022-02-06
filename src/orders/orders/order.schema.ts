import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Product {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Product" })
    product: string;

    @Prop({ default: 0 })
    quantity: number
}

export type OrderDocument = Order & Document;

@Schema({ timestamps: true})
export class Order {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
    owner: string;

    @Prop({ default: 0 })
    totalPrice: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Product" })
    products: Product;
}

export const Orderschema = SchemaFactory.createForClass(Order)