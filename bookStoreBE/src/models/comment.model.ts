import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  id: number;
  orderID: number;
  comment: string;
}

const commentSchema = new Schema<IComment>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  orderID: {
    type: Number,
    required: true,
    ref: 'Order'
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema); 