import mongoose from "mongoose";

const taskschema = new mongoose.Schema({
    titulo:{
        type : String,
        required : true,
        trim: true,

    },
    descripcion:{
        type : String,
        required : true,
        trim: true,

    },
    data:{
        type : Date,
        default : Date.now,

    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },

},{
    timestamps : true
})

export default mongoose.model('Task',taskschema)