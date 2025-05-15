import mongoose, { Document, Schema } from 'mongoose';

export interface ICartProduct extends Document {
  cartId: number;
  bookID: number;
  quantity: number;
}

export interface ICart extends Document {
  cartId: number;
  total: number;
  products?: ICartProduct[];
}

const cartProductSchema = new Schema<ICartProduct>({
  cartId: {
    type: Number,
    required: true,
    ref: 'Cart'
  },
  bookID: {
    type: Number,
    required: true,
    ref: 'Book'
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
});

const cartSchema = new Schema<ICart>({
  cartId: {
    type: Number,
    required: true,
    unique: true
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  products: [cartProductSchema]
}, {
  timestamps: true
});

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
export const CartProduct = mongoose.model<ICartProduct>('CartProduct', cartProductSchema); 