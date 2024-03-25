//importacion de dependencias

//para las rutas:
import { Router } from "express";
import {
  onetask,
  alltask,
  deletetask,
  updatetask,
  createtask,
  addTaskToProfile,
} from "../controllers/Task.controllers.js";

//middlewares:
import { validaruser } from "../middlewares/validarToken.js";
import { validarschema } from "../middlewares/validar.middleware.js";

//validacion de schemas importados arriba:
import { schematask } from "../schemas/task.schemas.js";

const router = Router();

//todas las tareas
router.get("/task", alltask);

//tareas especificas
router.get("/task/:id", onetask);

//agregar tareas al perfil de un usuario autenticado
router.post("/tasks/:id/add-to-profile", validaruser, addTaskToProfile);

//gestion de tareas, solo para administradores
router.post("/task", validaruser, validarschema(schematask), createtask);
router.delete("/task/:id", validaruser, deletetask);
router.put("/task/:id", validaruser, updatetask);

export default router;
