import AssetModel from "../models/Asset.js";

export const addAssetModel=async(req,res)=>{
    try {
        if(req.body){
            let isExists= await AssetModel.findOne({name: req.body.name})
            if(!isExists){
                await AssetModel.create(req.body)
            return res.status(200).send({message:"AssetModel Created"})
            } else {
                return res.status(400).send({error: "AssetModel Already exists"})
            }
            
        } else {
            return res.status(400).send({error:"Body cannot be empty"})
        }
    } catch (error) {
         return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        })
    }
}