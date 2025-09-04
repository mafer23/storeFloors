
import { registerUser, loginUser } from "../services/userService.js";

export async function register(req, res) {
  try {
    const { Name, Email, Password, telefono, direccion } = req.body;
    const { user, token } = await registerUser({ Name, Email, Password, telefono, direccion });

    res.status(201).json({ message: "Registro exitoso", user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { Email, Password } = req.body;
    console.log(req)
    const { user, token } = await loginUser({ Email, Password });

    res.json({ message: "Login exitoso", user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}
