import express from 'express'
import { verifyUser } from '../middlewares/verifyUser.js'
import { checkRole } from '../middlewares/checkRole.js'
import { addAssetItem, deleteAssetItem, editAssetItem, getAllAssetItems } from '../controllers/assetItemController.js'


const assetItemRouter = express.Router()


//add
assetItemRouter.post("/add",verifyUser,checkRole(["super admin", "admin"]),addAssetItem)

assetItemRouter.put("/edit",verifyUser,checkRole(["super admin", "admin"]),editAssetItem)

assetItemRouter.delete("/delete",verifyUser,checkRole(["super admin", "admin"]),deleteAssetItem)

assetItemRouter.get("/all",verifyUser,checkRole(["super admin", "admin"]),getAllAssetItems)




export default assetItemRouter