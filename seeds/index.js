const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const { ListGroupItem } = require('reactstrap');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log("Database Connected!");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<100; i++){
        const random1 = Math.floor(Math.random()*1000);
        const price = Math.random(Math.floor()*20) + 10;
        const camp = new Campground({
            location: `${cities[random1].city}, ${cities[random1].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collection/483251`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, nulla recusandae facere aliquam vel animi asperiores repellat dolore. Aut blanditiis quae necessitatibus illum dolore voluptas voluptatem fuga, nesciunt beatae atque.",
            price
        })
        await camp.save();
    }
}

seedDB().then(()=> {
    mongoose.connection.close();
})