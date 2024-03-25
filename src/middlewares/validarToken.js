import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config.js";
import User from "../models/user.model.js"; // Suponiendo que tengas un modelo de usuario

// Función para obtener el rol del usuario a partir de su ID
const obtenerRolDelUsuario = async (userId) => {
    try {
        // Buscar el usuario en la base de datos
        const usuario = await User.findById(userId);
        if (!usuario) {
            return null; // El usuario no existe
        }
        return usuario.role; // Devolver el rol del usuario
    } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        return null;
    }
};

// Middleware para validar el token de usuario y adjuntar el usuario (incluido el rol) a req.user
export const validaruser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No hay token" });
    } else {
        // Verificar el token JWT
        jwt.verify(token, TOKEN_KEY, async (error, decodedToken) => {
            if (error) {
                return res.status(401).json({ message: "Error en verificar token" });
            } else {
                try {
                    // Obtener el rol del usuario a partir de su ID
                    const { id } = decodedToken;
                    const role = await obtenerRolDelUsuario(id);
                    if (!role) {
                        return res.status(401).json({ message: "Usuario no encontrado" });
                    }

                    // Adjuntar el usuario (incluido el rol) a req.user
                    const userWithRole = { ...decodedToken, role };
                    req.user = userWithRole;

                    console.log(req.user);

                    next();
                } catch (error) {
                    console.error("Error al adjuntar el usuario:", error);
                    return res.status(500).json({ message: "Error interno del servidor" });
                }
            }
        });
    }
};
