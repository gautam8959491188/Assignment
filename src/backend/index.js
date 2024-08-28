const express = require("express")
const app = express();
app.use(express.json())
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

const mongoURL = "mongodb+srv://gautamupadhyay142000:8959491188@cluster0.otvloda.mongodb.net/"
mongoose.connect(mongoURL).then(()=>{console.log("Connect to database.");})
.catch((e)=>{console.log(e)})


app.listen(5000, ()=>{
    console.log("Server Started.")
})



require("./itemDetails");

const Item = mongoose.model("ItemInfo");








app.post("/addItem",async(req,res)=>{
    const {itemName,price,description, model, date} = req.body;
    try {
        console.log(model)

        await Item.create({
            itemName: itemName,
            price: price,
            description: description,
            model: model,
            date: date
        })
        res.send({status: "Ok"});
    } catch (error) {
        res.send({status: error})
    }
})

app.get("/getAllItem",async (req,res)=>{
    try {
        const allItem = await Item.find({});
        res.send({status: "Ok", data: allItem});
    
    } catch (error) {
        console.log(error)
    }
})





