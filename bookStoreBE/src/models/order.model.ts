import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderID: number;
  orderName: string;
  address: string;
  orderListBook: string;
  orderListQuantity: number;
  total: number;
  createAt: Date;
  state: string;
}

const orderSchema = new Schema<IOrder>({
  orderID: {
    type: Number,
    required: true,
    unique: true
  },
  orderName: {
    type: String,
    required: true,
    maxlength: 100
  },
  address: {
    type: String,
    required: true,
    maxlength: 200
  },
  orderListBook: {
    type: String,
    required: true
  },
  orderListQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  state: {
    type: String,
    maxlength: 100,
    default: 'pending'
  }
}, {
  timestamps: true
});

export const Order = mongoose.model<IOrder>('Order', orderSchema); 