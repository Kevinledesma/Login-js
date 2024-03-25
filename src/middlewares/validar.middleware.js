///creamos y exportamos un middleware para validar los schemas
export const validarschema = (schema) => (req,res,next) =>{

    try{
        schema.parse(req.body);
        next();
    }catch(error){
        return res.status(400).json(error.errors.map(error => error.message))
    }
}