//importacion de dependencias

//para las rutas:
import { Router } from "express";
import {
  onetask,
  alltask,
  deletetask,
  updatetask,
  createtask,
} from "../controllers/Task.controllers.js";

//middlewares:
import { validaruser } from "../middlewares/validarToken.js";
import { validarschema } from "../middlewares/validar.middleware.js";

//validacion de schemas importados arriba:
import { schematask } from "../schemas/task.schemas.js";

const router = Router();

router.get("/task", validaruser, alltask);
router.get("/task/:id", validaruser, onetask);
router.post("/task", validaruser, validarschema(schematask), createtask);
router.delete("/task/:id", validaruser, deletetask);
router.put("/task/:id", validaruser, updatetask);

export default router;
