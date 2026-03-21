import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      default : "User"
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔒 hide password by default
    },

    phone: {
      type: String,
      trim: true,
      default : 0
    },

    avatar: {
      type: String,
      default : null // image URL
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
    },
    
    income : {
        type : Number,
        required : true,
        default : 0
    },
    monthlySpend :{
      type : Number,
      required : true,
      default : 0
    },

    goal : {
      type : Number,
      default : 0
    }


  },
  {
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false,
  }
);

// 👇 IMPORTANT: model name "User" → collection name becomes "users"
export const User = mongoose.model("User", userSchema);
