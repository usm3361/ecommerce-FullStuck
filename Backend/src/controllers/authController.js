import { loginUser, registerUser } from "../services/authService.js";

export async function createRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide name, email, and password" });
    }
    const newUser = await registerUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
