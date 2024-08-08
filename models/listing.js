const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{ 
        type: String,
        default: "https://unsplash.com/photos/a-man-holding-a-fire-hose-in-front-of-a-large-fire-jUSQU1D-dds",
        set: (v) => v === '' ? "https://unsplash.com/photos/a-man-holding-a-fire-hose-in-front-of-a-large-fire-jUSQU1D-dds" 
        : v,
    },
    price: String,
    location: String,
    country: String
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
