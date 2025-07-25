import { verifyjwt } from "../Util/jwtutil.js";

const AuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token Missing" });
  }

  try {
    const user = await verifyjwt(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

export default AuthMiddleware;
