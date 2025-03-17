import mongoose , {Schema, Document} from "mongoose";

//for message//
//interface
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

//schema
const messageSchema = new Schema<Message>({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true ,default: Date.now },
});


//for user//
//interface
export interface User extends Document {
  username: string;
  password: string;
  email: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];

}

//schema
const userSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,

    //match with basic regix
    match: [
      /.+\@.+\..+/
        ,
      "Please add a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verificationCode: {
    type: String,
    required: [true, "Verification Code is required"],
  },
  verificationCodeExpiry: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [messageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema)); 
//User is the filename

export default UserModel;
