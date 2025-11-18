
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const path = require("path");
const methodOverride = require('method-override')
const ejsMate = require("ejs-mate");


app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")))


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL)
}

main().then(()=>{
console.log("connected to DB");
}).catch((err)=>{
console.log(err);
})


app.get("/", (req, res)=>{
    res.send("HI, I am root");
})

app.get("/listings", async (req, res) =>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
})




// new route
app.get("/listings/new", (req, res)=>{
    
    res.render("listings/new.ejs");
    // res.send("hello new ")
})

// show route
app.get("/listings/:id", async(req, res)=>{
    let{id} = req.params;
   let listing =   await Listing.findById(id);
   res.render("listings/show.ejs", {listing} )
})

// Create Route
app.post("/listings", async (req,res)=>{
    // let listing = req.body.listing;
  let allListing =  new Listing(req.body.listing)
 await  allListing.save();
 res.redirect("/listings");
})

// Edit Route
app.get("/listings/:id/edit", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
})

app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
})

// Delete Route
app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await  Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


app.listen(8080, ()=>{
    console.log("server is listing to port 8080");
})