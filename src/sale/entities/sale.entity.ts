import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shoe } from "src/shoe/entities/shoe.entity";

@Schema()
export class Sale extends Document {

    // id: string (proporcionado por mongo)

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shoe'
    })
    shoeId: mongoose.Types.ObjectId;;

    @Prop({
        required: true,
    })
    quantity: number;

    @Prop({
        required: true,
    })
    totalPrice: number;

}

export const SaleSchema = SchemaFactory.createForClass(Sale);
