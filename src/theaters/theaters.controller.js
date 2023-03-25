const theatersService = require("./theaters.service");

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
    theatersMovies,
}