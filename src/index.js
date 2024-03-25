import app from './app.js'
import { coneccion } from './db.js' 

coneccion();

app.listen(3000, (req,res) =>{
    console.log("server funcionando en puerto 3000")
})