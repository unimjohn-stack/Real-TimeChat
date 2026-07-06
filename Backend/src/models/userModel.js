import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    
    clerkId: {
        type:String,
        required: true,
        unique: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    fullName: {
        type:String,
        required: true,
        // unique: true,
    },
    proflePic: {
        type: String,
        default: "",
    },
}, {
    timestamps: true
},);

const User = mongoose.model("User", userSchema);
export default User;