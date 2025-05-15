import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  bookId: number;
  bookName: string;
  categories: string;
  quantity: number;
  price: number;
  detail: string;
  imageURL: string;
  createAt: Date;
}

const bookSchema = new Schema<IBook>({
  bookId: {
    type: Number,
    required: true,
    unique: true
  },
  bookName: {
    type: String,
    required: true,
    maxlength: 100
  },
  categories: {
    type: String,
    required: true,
    maxlength: 100
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  detail: {
    type: String
  },
  imageURL: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Book = mongoose.model<IBook>('Book', bookSchema); 