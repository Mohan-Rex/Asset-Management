import AssetModel from "../models/Asset.js";
import AssetItem from "../models/AssetItem.js";

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
        let assetItem = await AssetItem.findOne({ model: id })

        if (assetItem) {
            return res.status(400).send({ error: "Asset Items are present please delete all the asset Items" })
        }
        else {
            let response = await AssetModel.findByIdAndDelete(id)
            if (response) {
                return res.status(200).send({ message: "AssetModel Deleted" });
            }
            else {
                return res.status(400).send({ error: "Asset Model Not found" })
            }

        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getAllAssetModels = async (req, res) => {
    try {
        let assetModels = await AssetModel.find();

        if (assetModels && assetModels.length > 0) {
            return res.status(200).send({
                message: "All AssetModels fetched successfully",
                data: assetModels
            });
        } else {
            return res.status(404).send({
                error: "No AssetModels found"
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getAllAssetModelsWithItems = async (req, res) => {
    try {
        let allModelsWithItems = await AssetModel.aggregate([{
            $lookup: {
                localField: "_id",
                from: "assetitems",
                foreignField: "model",
                as: "items",
            }
        }])
        res.status(200).send(allModelsWithItems)

    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        });
    }
}

import mongoose from "mongoose";

export const getItemsOfTheModel = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ error: "Model Id is required" });
        }

        const allItems = await AssetModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "assetitems",   // collection name
                    localField: "_id",
                    foreignField: "model",
                    as: "items"
                }
            }
        ]);

        return res.status(200).send({
            message: "Items fetched successfully",
            data: allItems
        });

    } catch (error) {
        return res.status(500).send({
            message: "Something Went wrong",
            error: error.message
        });
    }
};
