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

export const editAssetModel = async (req, res) => {
    try {
        if (req.body && req.body._id) {
            let isExists = await AssetModel.findById(req.body._id);
            if (isExists) {
                await AssetModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
                return res.status(200).send({ message: "AssetModel Updated" });
            } else {
                return res.status(404).send({ error: "AssetModel Not Found" });
            }
        } else {
            return res.status(400).send({ error: "Body or ID cannot be empty" });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const deleteAssetModel = async (req, res) => {
    try {
        if (req.body && req.body._id) {
            let isExists = await AssetModel.findById(req.body._id);
            if (isExists) {
                await AssetModel.findByIdAndDelete(req.body._id);
                return res.status(200).send({ message: "AssetModel Deleted" });
            } else {
                return res.status(404).send({ error: "AssetModel Not Found" });
            }
        } else {
            return res.status(400).send({ error: "Body or ID cannot be empty" });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        });
    }
};

