const reviewsService = require("./reviews.service")








module.exports = {
    update: [validateReview, update],
    delete: [validateReview, destroy],
}