import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    id: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    allocated: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    spent: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    color: {
      type: String,
      required: true,
      match: /^#([0-9A-Fa-f]{3}){1,2}$/, // hex validation
    },

    icon: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= COMPOUND UNIQUE INDEX ================= */

// 🔥 Name unique per user
categorySchema.index({ userId: 1, name: 1 }, { unique: true });

// Optional: id unique per user
categorySchema.index({ userId: 1, id: 1 }, { unique: true });
const Category = mongoose.model("Category", categorySchema);
export default Category;