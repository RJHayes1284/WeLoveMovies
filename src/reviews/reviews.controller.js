const reviewsService = require("./reviews.service")

async function validateReview(req, res, next) {
    const { reviewId } = req.params;
    const review = await reviewsService.read(reviewId);

    if(review){
        res.locals.review = review;
        return next();
    }
    next({
        status:404, 
        message:`cannot be found: ${reviewId}`
    });
}

async function read(req, res, next) {
    try {
        const { reviewId } = req.params;
        const data = await reviewsService.read(reviewId);
        res.json({ data });
    }
    catch(error) {
        next(error);
    }
}

async function update(req, res) {

    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };

     await reviewsService.update(updatedReview);

     res.json({ data: await reviewsService.read(updatedReview.review_id) });
}

async function destroy(req, res, next){
    try {
      await reviewsService.delete(res.locals.review.review_id)
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  }


module.exports = {
    read: [validateReview, read],
    update: [validateReview, update],
    delete: [validateReview, destroy],
}