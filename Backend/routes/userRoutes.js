import express from "express"
import { addUser, changePass, deleteUser, editAdmin, editEmployee, getAllAdmins, getAllEmployees, updateUser } from "../controllers/userController.js"
import { verifyUser } from "../middlewares/verifyUser.js"
import { checkRole } from "../middlewares/checkRole.js"


const userRouter= express.Router()

//demo
userRouter.get("/",(req,res)=> res.send ({message:"user router is working"}))

// For adding an employee
userRouter.post("/add/employee", verifyUser, checkRole(["super admin", "admin"]), addUser);

userRouter.post("/add/admin",verifyUser,checkRole(["super admin"]), addUser)

//read
userRouter.get("/employees",verifyUser,checkRole(["admin","super admin"]),getAllEmployees)

userRouter.get("/admins",verifyUser,checkRole(["super admin"]),getAllAdmins)

//edit
userRouter.put("/edit/employee",verifyUser,checkRole(["admin","super admin"]),editEmployee)


userRouter.put("/edit/admin",verifyUser,checkRole(["super admin"]),editAdmin)

//update
userRouter.put("/update",verifyUser,updateUser)

//update password (using current password)
userRouter.patch("/changepass",verifyUser,changePass)

// delete
userRouter.delete("/delete/employee",verifyUser, checkRole(["admin","super admin"]),deleteUser)
userRouter.delete("/delete/admin",verifyUser, checkRole(["super admin"]),deleteUser)


export default userRouter 