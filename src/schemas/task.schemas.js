import {z} from 'zod';

export const schematask = z.object ({
    titulo : z.string({
        required_error : "titulo requerido",
    }),
    descripcion : z.string({
        required_error : "descripcion requerida",
    }),
    data : z.string().datetime().optional(),

})