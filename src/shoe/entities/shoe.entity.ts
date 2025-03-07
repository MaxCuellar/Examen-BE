import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ShoeBrand } from "../enums/shoe-brand.enum";
import { ShoeSizeUS } from "../enums/shoe-sizeUS.enum";
import { ShoeGender } from "../enums/shoe-gender.enum";
import { ShoeCategory } from "../enums/shoe-category.enum";

@Schema()
export class Shoe extends Document {

    // id: string (proporcionado por mongo)

    @Prop({
        required: true,
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        required: true,
        enum: ShoeBrand,
    })
    brand: string;

    @Prop({
        required: true,
        enum: ShoeSizeUS,
    })
    size: number;

    @Prop({
        required: true,
    })
    price: number;

    @Prop({
        required: true,
        default: 0,
    })
    stock: number;

    @Prop({
        required: true,
        enum: ShoeGender
    })
    gender: string;

    @Prop({
        required: true,
        enum: ShoeCategory,
    })
    category: string;

    @Prop({
        required: true,
        default: true
    })
    active: boolean;

}

export const ShoeSchema = SchemaFactory.createForClass(Shoe);
