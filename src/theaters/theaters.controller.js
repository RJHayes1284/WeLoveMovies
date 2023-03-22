const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function theatersMovies (req, res, next) {
    try {
        const data = await theatersService.listTheaters();
        res.json({ data });
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
   read: asyncErrorBoundary(theatersMovies)
}