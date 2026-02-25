import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";

const saltRounds = 10;

export async function registerUser(name, email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userData = {
      name,
      email,
      password: passwordHash,
    };
    const result = await createUser(userData);
    delete userData.password;
    userData._id = result;
    return userData;
  }
  throw new Error("This user cannot be created, this email already exists");
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("This user is not found");
  }
  const isCompare = await bcrypt.compare(password, user.password);
  if (!isCompare) {
    throw new Error("Username does not match password");
  }
  const token = jwt.sign({ userId: user._id });
}
