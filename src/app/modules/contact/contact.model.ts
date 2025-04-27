import { model, Schema } from "mongoose";
import { TContact } from "./contact.interface";

const contactSchema = new Schema<TContact>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = model<TContact>("Contact", contactSchema);
