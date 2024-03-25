//importacion de dependencias

//para las rutas:
import { Router } from "express";
import {login,register,logout,profile} from "../controllers/User.controllers.js";

//middlewares:
import {validaruser} from "../middlewares/validarToken.js";
import {validarschema} from "../middlewares/validar.middleware.js";

//validacion de schemas importados arriba:
import {registroschema , loginschema } from "../schemas/user.schemas.js";

const router = Router();

router.post('/register',validarschema(registroschema), register);
router.post('/login',validarschema(loginschema), login);
router.post('/logout', logout);
router.get('/profile',validaruser, profile);

export default router