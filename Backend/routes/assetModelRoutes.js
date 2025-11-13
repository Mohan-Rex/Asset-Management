import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js"
import { addAssetModel, deleteAssetModel, editAssetModel, getAllAssetModels, getAllAssetModelsWithItems } from "../controllers/assetModelController.js"
import { checkRole } from "../middlewares/checkRole.js"

const assetModelRouter=express.Router()
//demo
assetModelRouter.get("/",(req,res)=>res.send({message:"asset router is working"}))

assetModelRouter.post('/add',verifyUser,checkRole(["admin","super admin"]),addAssetModel)
//update(params)
assetModelRouter.put('/edit/:id',verifyUser,checkRole(["admin","super admin"]),editAssetModel)

assetModelRouter.delete('/delete',verifyUser,checkRole(["admin","super admin"]),deleteAssetModel)

assetModelRouter.get('/all',verifyUser,getAllAssetModels)

// get All with items
assetModelRouter.get('/all/items',verifyUser,getAllAssetModelsWithItems)


export default assetModelRouter 