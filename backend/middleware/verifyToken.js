import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token tidak tersedia",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token tidak valid",
      });
    }
    req.user = user;
    next();
  });
};
