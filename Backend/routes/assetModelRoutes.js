import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js"
import { addAssetModel } from "../controllers/assetModelController.js"
import { checkRole } from "../middlewares/checkRole.js"

const assetModelRouter=express.Router()
//demo
assetModelRouter.get("/",(req,res)=>res.send({message:"asset router is working"}))

assetModelRouter.post('/add',verifyUser,checkRole(["admin","super admin"]),addAssetModel)

export default assetModelRouter 