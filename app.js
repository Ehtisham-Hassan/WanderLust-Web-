const express = require("express");
const app = express();

//data base
const mongoose = require('mongoose');
const Listing = require("./models/listing.js")

// add aditinal request
const methodOverride = require("method-override")
app.use(methodOverride("_method"))

//ejs 
const ejs = require("ejs");
const path = require("path");
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended: true}))

//ejs-mathe
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);


const DB_URL = "mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(DB_URL);
}

app.get("/", (req,res)=>{
    res.send("Hi I am Root");
});

app.get("/listing", async (req,res)=>{
    const allListing = await Listing.find();
    // res.send(allListing);
    res.render("listing/index.ejs" ,{allListing} );
});

//new req
app.get("/listing/New", async (req,res)=>{
    res.render("listing/New.ejs")
})

//Create Route
app.post("/listing", async (req,res)=>{
    // const {title,description,price,location,country} = req.body;
    const newListing = new Listing( req.body.listing);
    await newListing.save();

    res.redirect("/listing");
    // console.log(listing);  
    
    // const newListing = new Listing({
    //     title:title,
    //     description:description,
    //      image:image,
    //     price:price,
    //     location:location,
    //     country:country,
    // })
    // await newListing.save();
    // res.redirect("/listing");

})


//show route
app.get("/listing/:id", async (req,res)=>{
    const { id }= req.params;
    let listing = await Listing.findById(id);
    // res.send(listing);
    res.render("listing/show.ejs" ,{listing} );
});

//Edit route
app.get("/listing/:id/edit", async (req,res)=>{
    const { id }= req.params;
    let listing = await Listing.findById(id);
    res.render("listing/Edit.ejs" ,{listing} );
});    

//Update route
app.put("/listing/:id" ,async (req,res)=>{
    let {id }= req.params;
    console.log("put req :")
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    console.log({...req.body.listing})
    res.redirect(`/listing/${id}`)
})

//Delete route
app.delete("/listing/:id", async (req,res)=>{
    let {id }= req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listing");
})

// app.get("/test",async (req,res)=>{
//     let sample_listing = new Listing({
//         title: "My Listing",
//         description:"by the beach",
//         price: 200,        
//         location:"lahore",
//         country: "pakistan",
//     })
//     await sample_listing.save();
//     console.log("sample was saved");
//     res.send("data saved")    
// })


app.listen(8080,()=>{
    console.log("server is running on port 8080");
})

