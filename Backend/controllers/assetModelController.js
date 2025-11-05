import AssetModel from "../models/Asset.js";

export const addAssetModel = async (req, res) => {
    try {
        if (req.body) {
            let isExists = await AssetModel.findOne({ name: req.body.name })
            if (!isExists) {
                await AssetModel.create(req.body)
                return res.status(200).send({ message: "AssetModel Created" })
            } else {
                return res.status(400).send({ error: "AssetModel Already exists" })
            }

        } else {
            return res.status(400).send({ error: "Body cannot be empty" })
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
        if (req.body) {
            let { id } = req.params;

            await AssetModel.findByIdAndUpdate(id, { $set: { ...req.body } });
            return res.status(200).send({ message: "AssetModel Updated" });
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

        let { id } = req.query;
        let response= await AssetModel.findByIdAndDelete(id)
        if(response){
             return res.status(200).send({ message: "AssetModel Deleted" });
        }
       else {
            return res.status(400).send({error:"Asset Model Not found"})
       }

    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        });
    }
};

