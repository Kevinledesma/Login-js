import { useForm } from "react-hook-form"; //react-hook-form sirve para manejar los formularios y sus estados
import { useAuth } from "../context/AuthContext";

import {Link} from 'react-router-dom'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: signInErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold text-white">LOGIN</h1>

        {signInErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}
          <button type="submit" className="text-white">
            LOGIN
          </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          No tienes cuenta? <Link to="/register" className="text-sky-500">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
