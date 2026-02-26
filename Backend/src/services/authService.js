import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserModel, findUserByEmailModel } from "../models/userModel.js";

const saltRounds = 10;

export async function registerUserService(name, email, password) {
  const user = await findUserByEmailModel(email);
  if (!user) {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userData = {
      name,
      email,
      password: passwordHash,
    };
    const result = await createUserModel(userData);
    delete userData.password;
    userData._id = result;
    return userData;
  }
  throw new Error("This user cannot be created, this email already exists");
}

export async function loginUserService(email, password) {
  const user = await findUserByEmailModel(email);
  if (!user) {
    throw new Error("This user is not found");
  }
  const isCompare = await bcrypt.compare(password, user.password);
  if (!isCompare) {
    throw new Error("Username does not match password");
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "my_super_secret_key",
    { expiresIn: "1h" },
  );
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;

  return {
    token,
    user: userWithoutPassword,
  };
}
