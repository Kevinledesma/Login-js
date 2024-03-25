import {z} from 'zod';

export const registroschema =  z.object({
    username : z.string({
        required_error : "username is required"

    }),

    email : z.string({
        required_error : "email is required"

    }).email({
        required_error : "email is invalid"

    }),

    password : z.string({
        required_error : "password is invalid"

    }).min(6,{
        required_error : "minimo 6 caracteres",
    }),
});

export const loginschema =  z.object({
    email : z.string({
        required_error : "email is required"

    }).email({
        required_error : "email is invalid"

    }),

    password : z.string({
        required_error : "password is invalid"

    }).min(6,{
        required_error : "minimo 6 caracteres",
    }),
});




