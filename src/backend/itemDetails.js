const mongoose = require("mongoose")

const  ItemDetailsSchema = new mongoose.Schema(
    {
        itemName: String,
        price: Number,
        description: String,
        model: String,
        date: Date,
        
    },
    {
        collection: "ItemInfo"
    }
);

mongoose.model("ItemInfo",ItemDetailsSchema);