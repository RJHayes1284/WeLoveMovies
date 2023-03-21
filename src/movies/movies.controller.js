const movies = require("../db/seeds/01_movies");








module.exports = {
    list,
    read: [validateMovie, read],
    readTheaters,
    readReviews,
}