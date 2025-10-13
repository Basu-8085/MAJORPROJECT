const express = require("express");
const app = express();
const mongoose = require("mongoose");
const list = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");

app.use(express.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(methodOverride("_method"))
app.engine("ejs" , ejsmate);
app.use(express.static(path.join(__dirname , "/public")));

const url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected DB")
}).catch(
    err => console.log(err));

async function main() {
    await mongoose.connect(url);
}

app.get("/listings/:id/edit" ,async (req,res) => {
    let {id} = req.params;
    const listing = await list.findById(id)
    res.render("listings/edit.ejs" , {listing})
    // res.send({listing})
})

app.put("/list/:id" , async (req,res) => {
    let {id} = req.params;
    await list.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`)
});

app.get("/Listings" , async (req,res) => {
    const allListings = await list.find({});
    res.render("listings/index.ejs" , {allListings});
})

app.get("/listings/create"  , (req,res) => {
    res.render("listings/create.ejs")
})

app.post("/listings/create" , async (req,res) => {
    let newListing = req.body.listing;
    let listing  = new list(newListing)
    await listing.save();
    res.redirect("/listings");
})

app.get("/listings/:id" , async (req,res) => {
    let {id} = req.params;
    const listing = await list.findById(id);
    res.render("listings/show.ejs" , {listing})
})


// app.get("/testlisting" , async (req,res) => {
//     let newlist = new list({
//         title : "Beautiful Beach House",
//         description : "its to quite to celebrate",
//         image : "",
//         price : 1200,
//         location : "calangata , goa",
//         country : "india"
//     })

//     await newlist.save()
//     console.log("the data was saved")
//     res.send("the data was saved")
    

// }) 

app.delete("/listing/:id" , async (req,res) => {
    let {id} = req.params;
    await list.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.listen(8080 , () => {
    console.log("server is running on port 8080")
});