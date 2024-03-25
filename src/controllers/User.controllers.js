import User from "../models/user.model.js"
import bcrypt from 'bcrypt';
import { creartoken } from "../libs/jwt.js";

//Registro:

export const register = async (req,res) =>{
    const {email,password, username , role} =  req.body;

    try{
        //validamos que no haya otro registrado con el mimso email
        const BuscarUser = await User.findOne({email});
        if(BuscarUser){
            return res.status(400).json({message: "el email ya existe"})
        }

        //hasheamos contraseña
        const contraseñaHash = await bcrypt.hash(password, 10);
        //creamos el nuevo usuario y luego lo guardamos en la base de datos
        const nuevousuario = new User({
            username,
            email,
            password : contraseñaHash,
            role: role || 'client'
        })

        const usuarioguardado = await nuevousuario.save();

        const token = await creartoken ({id: usuarioguardado._id})
        res.cookie('token' , token)

        res.json({
            id: usuarioguardado._id,
            username: usuarioguardado.username,
            email : usuarioguardado.email,
            role: usuarioguardado.role
        })

    }catch(err){
        console.log(err)
    }
}


export const login = async (req,res) =>{
    const {email , password} = req.body;

    try{
        const buscarusuario = await User.findOne({email})

        if (!buscarusuario){
            return res.status(400).json({
                message : "no existe ese usuario"
            })

        }

        const comparacion = await bcrypt.compare(password , buscarusuario.password);
        if(!comparacion){
            return res.status(400).json({
                message: "contraseña incorrecta"
            })

        }

        //guardamos el token FUNDAMENTALLLLLL
        const token = await creartoken ({ id : buscarusuario._id});
        res.cookie('token' , token);

        res.json({
            id: buscarusuario._id,
            username: buscarusuario.username,
            email : buscarusuario.email,
            role : buscarusuario.role,
            message : "login correcto",
        })

    }catch(err){
        console.log(err)
    }
}


export const logout = async (req,res) => {
    res.cookie(
        'token', "" , {expires : new Date(0)}
    )

    return res.status(200).json({message: "logout"});

}



export const profile = async (req,res) => {
    const buscarusuario = await User.findById(req.user.id);

    if(!buscarusuario){
        return res.status(400).json({message : "no se encontro usuario"})

    }else{
        return res.json({
            id : buscarusuario._id,
            username: buscarusuario.username,
            email: buscarusuario.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt
        })
    }

    res.send('profile');
}





