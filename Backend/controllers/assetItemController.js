import AssetItem from "../models/AssetItem.js"

// Add Asset
export const addAssetItem = async (req, res) => {
    try {
        if (req.body) {
            let isExists = await AssetItem.findOne({ serialNumber: req.body.serialNumber })
            if (!isExists) {
                await AssetItem.create(req.body)
                return res.status(200).send({ message: "Asset Created" })
            } else {
                return res.status(400).send({ error: "Asset Already exists" })
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

// Edit Asset
export const editAssetItem = async (req, res) => {
    try {
        if (!req.body || !req.body.id) {
            return res.status(400).send({ error: "Body or ID cannot be empty" })
        }

        const { id, ...updateData } = req.body
        const asset = await AssetItem.findById(id)

        if (!asset) {
            return res.status(404).send({ error: "Asset not found" })
        }

        await AssetItem.findByIdAndUpdate(id, updateData, { new: true })
        return res.status(200).send({ message: "Asset Updated Successfully" })

    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        })
    }
}

// Delete Asset
export const deleteAssetItem = async (req, res) => {
    try {
        if (!req.body || !req.body.id) {
            return res.status(400).send({ error: "ID is required in body" })
        }

        const asset = await AssetItem.findById(req.body.id)
        if (!asset) {
            return res.status(404).send({ error: "Asset not found" })
        }

        await AssetItem.findByIdAndDelete(req.body.id)
        return res.status(200).send({ message: "Asset Deleted Successfully" })

    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        })
    }
}
