const moviesService = require("./movies.service");

//confirms that the movie exists by validating movieId, returns an error message if not
async function validateMovie(req, res, next) {
    const { movieId } = req.params;
    const movie = await moviesService.read(movieId);

    if (movie) {
        res.locals.movie = movie;
        return next();
    } else {
        next({
            status: 404,
            message: `Movie cannot be found: Id ${movieId}`
        });
    }
}

async function list(req, res, next) {
    try{
        const data = await moviesService.list(req.query.is_showing);
        res.json({ data });
    }
    catch(error) {
        next(error);
    }
}

async function read(req, res, next) {
    try {
        const { movieId } = req.params;
        const data = await moviesService.read(movieId);
        res.json({ data });
    }
    catch(error) {
        next(error);
    }
}

async function readTheaters(req, res) {
    res.json({ data: await moviesService.readTheaters(req.params.movieId)})
}

async function readReviews(req, res) {
    res.json({ data: await moviesService.readReviews(req.params.movieId)})
}

module.exports = {
    list,
    read: [validateMovie, read],
    readTheaters,
    readReviews,
}