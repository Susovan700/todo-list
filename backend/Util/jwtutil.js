import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET;
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
