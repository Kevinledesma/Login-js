import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth"; //proviene del axios para realizar solicitudes


export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("no context");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, SetIsAuthenticated] = useState(false);

  const [errors, setErrros] = useState([]);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      SetIsAuthenticated(true);
    } catch (err) {
      setErrros(err.response.data);
    }
  };

  const signIn = async (user) => {
    try {
        const res = await loginRequest(user);
        console.log(res.data);
        
      } catch (err) {
        if(Array.isArray(err.response.data)){
            return setErrros(err.response.data);
        
        }

        setErrros([err.response.data.message]);
      }
  };
  
  useEffect(()=>{
    if(errors.length > 0){
        const timer = setTimeout(()=>{
            setErrros([])
        },5000)

        return () =>clearTimeout(timer)
    }
  },[errors])

  return (
    <AuthContext.Provider value={{signIn, signUp, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
