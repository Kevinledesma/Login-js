import Task from "../models/task.model.js"

export const alltask = async (req, res) => {
    try {
        // Se permitirá que todos los usuarios vean todas las tareas disponibles
        const allTasks = await Task.find({});
        return res.json(allTasks);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

//una tarea especifica por su id
export const onetask = async (req, res) => {
    try {
        const oneTask = await Task.findById(req.params.id);
        if (!oneTask) {
            return res.status(404).json({ message: "No se encontró la tarea especificada" });
        } else {
            // Retorna la tarea encontrada
            return res.json(oneTask);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const addTaskToProfile = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        // Verifica si el usuario ya tiene la tarea en su perfil
        const user = await User.findById(userId);
        if (user.tasks.includes(taskId)) {
            return res.status(400).json({ message: "La tarea ya está en el perfil del usuario" });
        }

        // Agrega la tarea al perfil del usuario
        user.tasks.push(taskId);
        await user.save();

        return res.status(200).json({ message: "Tarea agregada exitosamente al perfil del usuario" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Controlador para crear una nueva tarea (solo para administradores)
export const createtask = async (req, res) => {
    try {
        // Solo se permitirá crear una tarea si el usuario es un administrador
        if (req.user.role === 'admin') {
            const { titulo, descripcion, data } = req.body;
            const photo = req.file;
            const newTask = new Task({
                titulo,
                descripcion,
                data,
                user: req.user.id,
                foto: photo ? photo.filename : null // Guardar el nombre del archivo de foto si está presente
            });
            const nuevaTarea = await newTask.save();
            return res.json(nuevaTarea);
        } else {
            return res.status(403).json({ message: "No tienes permiso para crear una nueva tarea" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deletetask = async (req, res) => {
    try {
        // Solo se permitirá eliminar una tarea si el usuario es un administrador
        if (req.user.role === 'admin') {
            const task = await Task.findByIdAndDelete(req.params.id);
            if (!task) {
                return res.status(404).json({ message: "No se encontró la tarea especificada" });
            } else {
                return res.sendStatus(204);
            }
        } else {
            return res.status(403).json({ message: "No tienes permiso para eliminar esta tarea" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Controlador para actualizar una tarea (solo para administradores)
export const updatetask = async (req, res) => {
    try {
        // Solo se permitirá actualizar una tarea si el usuario es un administrador
        if (req.user.role === 'admin') {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!task) {
                return res.status(404).json({ message: "No se encontró la tarea especificada" });
            } else {
                return res.json(task);
            }
        } else {
            return res.status(403).json({ message: "No tienes permiso para actualizar esta tarea" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};