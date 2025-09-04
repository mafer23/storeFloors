import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userModel from "../models/userModels.js"; 
import {findRoleByType,assignRoleToUser, getRole, findRoleById} from "../models/rolModels.js";

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "mi_clave_secreta", {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

}

export async function registerUser({ Name, Email, Password, telefono, direccion }) {
  const existing = await userModel.findUserByEmail(Email);
  if (existing) throw new Error("El usuario ya existe con este correo");

  const hashed = await bcrypt.hash(Password, 10);
  const newUser = await userModel.createUser({ Name, Email, Password: hashed, telefono, direccion });

  const rol = await  findRoleByType("User");

    await assignRoleToUser(newUser.id_usuario, rol.id_rol);
 
    


  const token = signToken({ id: newUser.id_usuario, name: newUser.Name, role: rol.tipo });
  return { user: newUser, token };
}

export async function loginUser(body) {
  // 👇 normalizamos llaves (acepta email o Email, password o Password)
  const email = body.email || body.Email;
  const password = body.password || body.Password;

  if (!email || !password) {
    throw new Error("Debes ingresar email y password");
  }

  const user = await userModel.findUserByEmail(email);

  if (!user) throw new Error("Credenciales inválidas");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Credenciales inválidas");

  if (user.activo === 0) throw new Error("Usuario inactivo");

  const idRol = await getRole(user.id_usuario);
  const nameRol = await findRoleById(idRol.id_rol);

  const token = signToken({
  id: user.id_usuario,
  name: user.name,
  role: idRol.id_rol  
});


  return {
    user: {
      id_usuario: user.id_usuario,
      name: user.name,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      fecha_registro: user.fecha_registro,
      role: nameRol
    },
    token,
  };
}
