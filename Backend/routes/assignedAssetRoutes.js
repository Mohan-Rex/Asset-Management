import {Router} from "express"
import { verifyUser } from "../middlewares/verifyUser.js";
import { checkRole } from "../middlewares/checkRole.js";
import { addAssignedAsset, getAllAssignedAssets, getMyAssignedAssets } from "../controllers/assignedAssetController.js";


const assignedAssetRouter = Router ();

assignedAssetRouter.get("/",(req,res)=> {
    res.send("assignedAssetRoutes working ")
});


assignedAssetRouter.post("/add",verifyUser,checkRole(["admin","super admin"]),addAssignedAsset)

assignedAssetRouter.get("/all",verifyUser,checkRole(["admin","super admin"]),getAllAssignedAssets)

assignedAssetRouter.get("/myAssets",verifyUser,getMyAssignedAssets)



export default assignedAssetRouter