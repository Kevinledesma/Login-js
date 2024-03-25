//importamos dependencias
import express from 'express'
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
//importamos rutas
import UserRouter from "./routes/User.routes.js"
import TaskRouter from "./routes/task.routes.js"




//creamos la app
const app = express();

//usamos dependencias
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//usamos rutas
app.use("/api" , UserRouter);
app.use("/api" , TaskRouter);



export default app;