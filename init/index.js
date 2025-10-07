const mongoose = require("mongoose");
const listing = require("../models/listing.js")
const initdata = require("./data.js")


const url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected DB")
}).catch(
    err => console.log(err));

async function main() {
    await mongoose.connect(url);
}


const newlist = async () => {
    try{
        await listing.deleteMany({});
        await listing.insertMany(initdata.data);
        console.log("the data was saved")
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

newlist();