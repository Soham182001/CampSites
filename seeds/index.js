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
    for(let i=0; i<300; i++){
        const random1 = Math.floor(Math.random()*1000);
        const price = Math.random(Math.floor()*20) + 10;
        const camp = new Campground({
            author: '62e5a407e7486d32a2f85c4b',
            location: `${cities[random1].city}, ${cities[random1].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, nulla recusandae facere aliquam vel animi asperiores repellat dolore. Aut blanditiis quae necessitatibus illum dolore voluptas voluptatem fuga, nesciunt beatae atque.",
            geometry: { 
              type: 'Point',
              coordinates: [
                cities[random1].longitude,
                cities[random1].latitude
              ] 
            },
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dgfpano4j/image/upload/v1659362760/YelpCamp/n5p7aniakgyztinifcvq.jpg',
                  filename: 'YelpCamp/n5p7aniakgyztinifcvq',
                },
                {
                  url: 'https://res.cloudinary.com/dgfpano4j/image/upload/v1659362770/YelpCamp/xbq8yxydbxk3uzftfxf3.jpg',
                  filename: 'YelpCamp/xbq8yxydbxk3uzftfxf3',
                },
                {
                  url: 'https://res.cloudinary.com/dgfpano4j/image/upload/v1659362774/YelpCamp/fhjbgbx2nkml1x14mqot.jpg',
                  filename: 'YelpCamp/fhjbgbx2nkml1x14mqot',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(()=> {
    mongoose.connection.close();
})