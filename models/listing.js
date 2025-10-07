const mongoose = require("mongoose")
const scheme = mongoose.Schema;


const listingschema = new scheme({
    title : {
        type: String
    },
    description :{
        type: String} ,
    image: {
        type : String,
        set :(v) => v ==="" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cntraveler.com%2Fstory%2Fairbnb-luxe-a-first-look&psig=AOvVaw3-AtI9VXRLxX3GoHhjONeM&ust=1758120429449000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJDe25LD3Y8DFQAAAAAdAAAAABAE" : v,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cntraveler.com%2Fstory%2Fairbnb-luxe-a-first-look&psig=AOvVaw3-AtI9VXRLxX3GoHhjONeM&ust=1758120429449000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJDe25LD3Y8DFQAAAAAdAAAAABAE",
    },
    price : {
        type : Number
    },
    location :{type:  String,},
    country : {type: String}
})



const list = mongoose.model("Listing" ,listingschema );
module.exports = list;