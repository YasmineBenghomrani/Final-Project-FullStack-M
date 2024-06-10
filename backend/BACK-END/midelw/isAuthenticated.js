import Jwt from "jsonwebtoken";

export default function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.send({
      message: "you dont have token",
    });
  }

  try {
    console.log("first");
    const data = Jwt.verify(token, "jwt_secret");
    console.log(data);
    req.userId = data.id;
  } catch (error) {
    console.log(error);
    res.send({
      message: "you dont have token",
    });
  }

  next();
}
