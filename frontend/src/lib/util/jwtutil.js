import jwt from "jsonwebtoken";


const SECRET_KEY = "susovan_super_secret_key_123";
export function generatejwt(user_id, email) {
  return jwt.sign({ user_id, email }, SECRET_KEY, {
    expiresIn: "3h",
  });
}

export function verifyjwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject("Invalid Token");
      } else {
        resolve(decoded);
      }
    });
  });
}
