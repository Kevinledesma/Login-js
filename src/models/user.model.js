import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true
        
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    }
} , {
    timestamps : true 
})

export default mongoose.model("User" , userschema);