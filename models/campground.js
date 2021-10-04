const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

// https://res.cloudinary.com/dwwvtzk17/image/upload/w_200/v1632870878/YelpCamp/tv1qjswm7s9ke29mxnsj.jpg

const imageSchema = new Schema({
    url: String,
    filename: String,
});
imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const campgroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', campgroundSchema);