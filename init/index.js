const mongoose = require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js")

const DB_URL = "mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(DB_URL);
}

const initDB = async () => {
    await Listing.deleteMany();
    await Listing.insertMany(initData.data);
    console.log("data is saved")
}

initDB();    
