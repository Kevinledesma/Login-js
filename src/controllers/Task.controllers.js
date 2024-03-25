import Task from "../models/task.model.js"

export const alltask = async (req,res) => {
    //buscamos todas las tareas que posee el usuario guardado en el req
    const Alltasks = await Task.find({
        user : req.user.id
    })
    res.json(Alltasks);
}

export const onetask = async (req,res) => {
    const Onetask = await Task.findById(req.params.id).populate("user");

    if(!Onetask){
        return res.status(400).json({message: "no se encontro tarea especificada"})

    }else{
        return res.json(Onetask)
    }

}
export const createtask = async (req,res) => {
    const {titulo,descripcion,data} = req.body;

    const newtask = new Task({
        titulo,
        descripcion,
        data,
        user : req.user.id,
    })

    const nuevaTarea = await newtask.save();

    res.json(nuevaTarea);
    console.log(nuevaTarea);
}
export const deletetask = async (req,res) => {
    const task = await Task.findByIdAndDelete(req.params.id)

    if(!taks){
        return res.status(400).json({message : "no se encontro tarea espeficicada"})

    }else{
        return res.sendStatus(204);
    }

}
export const updatetask = async (req,res) => {
    const task = await Task.findByIdAndUpdate(req.params.id , req.body , {new : true})

    if(!taks){
        return res.status(400).json({message : "no se encontro tarea espeficicada"})

    }else{
        return res.json(task);
    }
}