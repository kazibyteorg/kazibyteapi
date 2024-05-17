import { Schema, model } from "mongoose";

const faqSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: true,
    },
    description: {
      type: String,
      required: true,
      default: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FAQ = model("FAQ", faqSchema);

export default FAQ;
