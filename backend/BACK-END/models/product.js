import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },

    category: {
      type: String,
      enum: ["PC", "headphones"],
      required: [true, "category is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    qte: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "price required"],
      default: 0,
    },

    picture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F9292244-default-avatar-icon-vector-of-social-media-user&psig=AOvVaw2MPmgbNF41Ri2ZTkHhWRi9&ust=1707575315390000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDDgvK7noQDFQAAAAAdAAAAABAE",
      required: [true, "Picture required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);
