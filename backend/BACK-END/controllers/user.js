import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const {
    lastName,
    firstName,
    profilePicture,
    email,
    password,
    confirmPassword,
  } = req.body;

  //1 verification que les champs sont remplie
  if (!lastName || !firstName || !email || !password || !confirmPassword) {
    res.send({
      error: true,
      message: "you must provide all value",
    });
  }

  //2 verification du mot de passe
  if (password !== confirmPassword) {
    res.send({
      error: true,
      message: "incorrect password",
    });
  }

  // Hashage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  //aucune erreur
  const userCreated = await User.create({
    lastName,
    firstName,
    profilePicture,
    email,
    password: hashedPassword,
  });

  userCreated.password = undefined;

  const accessToken = jwt.sign({ id: userCreated._id }, "jwt_secret", {
    expiresIn: 30 * 24 * 3600,
  });

  res.send({
    message: "User created with success",
    user: userCreated,
    accessToken,
  });
}
export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({
      message: "you must provide all value",
    });
  }

  //trouver un utilisateur par son email
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    res.send({
      message: "email is wrong",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.send({
      message: "password is wrong",
    });
  }

  user.password = undefined;

  // cree un token pour l'utilisateur
  const accessToken = jwt.sign({ id: user._id }, "jwt_secret", {
    expiresIn: 30 * 24 * 3600,
  });

  res.send({ user, accessToken });
}
export async function getAllUsers(req, res) {
  const users = await User.find();
  res.send(users);
}
export async function getMe(req, res) {
  const oneUser = await User.findById(req.userId);
  if (!oneUser) {
    res.send({ message: "This user does not exist" });
  } else {
    res.send(oneUser);
  }
}
export async function updateUser(req, res) {
  const updateUser = await User.findByIdAndUpdate(req.userId);
  if (!updateUser) {
    res.send({ message: "This user doent exist" });
  } else {
    res.send({ message: "Updated with success" });
  }
}
export async function deleteUser(req, res) {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  if (!deleteUser) {
    res.send({ message: "This user doent exist" });
  } else {
    res.send({ message: "Deleted with success" });
  }
}
