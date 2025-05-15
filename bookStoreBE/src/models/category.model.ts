import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  categoriesID: number;
  categoriesName: string;
  detail: string;
}

const categorySchema = new Schema<ICategory>({
  categoriesID: {
    type: Number,
    required: true,
    unique: true
  },
  categoriesName: {
    type: String,
    required: true,
    maxlength: 100
  },
  detail: {
    type: String
  }
}, {
  timestamps: true
});

export const Category = mongoose.model<ICategory>('Category', categorySchema); 