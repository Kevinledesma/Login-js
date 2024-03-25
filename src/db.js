import mongoose from "mongoose";

export const coneccion = async () =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/nuevoCrud');
        console.log("conectado a base de datos");

    }catch(err){
        console.log(err);
    }
}