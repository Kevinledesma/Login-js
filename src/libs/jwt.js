import { TOKEN_KEY } from "../config.js";
import  jwt  from "jsonwebtoken";

export function creartoken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_KEY, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
