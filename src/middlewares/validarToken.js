import jwt from "jsonwebtoken";
import {TOKEN_KEY} from "../config.js";

//creamos un token y lo exportamos

export const validaruser = (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message : "no hay token"})
    }else{
        jwt.verify(token, TOKEN_KEY, (error , user) =>{
            if (error){
                return res.status(401).json({message : "error en verificar token"})
            }else{
                req.user = user;
                next();
            }
        })
    }
}