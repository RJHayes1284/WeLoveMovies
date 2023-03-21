const knex = require("../db/connection"); 
const mapProperties = require("../utils/map-properties");







module.exports = {
    read,
    update,
    delete: destroy,
}