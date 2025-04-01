import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) =>{
  const user = await prisma.user.create({
    data: {
      username : req.body.username,
      password : await hashPassword(req.body.password)
  }
  })
  const token = createJWT(user);
  return res.status(201).json({message: "New user created", token})
}

export const signin = async (req, res) =>{
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  if (!user) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const isValid = await comparePasswords(req.body.password,  user.password)
  if(!isValid){
    return res.status(401).json({message: "Incorrect userId or password"})
  }

  const token = createJWT(user)
  return res.status(200).json({message: "Login Successfull", token})
}