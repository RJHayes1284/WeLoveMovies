const knex = require("../db/connection"); 
const mapProperties = require("../utils/map-properties");


async function list(isShowing) {
    if (isShowing){
        return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theateres.movie_id")
        .distinct("movies.*")
        .where({"movies_theaters.is.showing":true})
    }
    return knex("movies").select("*")
    }

async function read(movieId) {
    return knex("movies")
    .select("*")
    .where({ "movie_id":movieId })
    .first()
}

async function readTheaters(movieId){
    return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("*")
    .where({"movie_id":movieId, "is_showing":true})
    .distinct();
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
  });
  
async function readReviews(movieId){
    return knex("reviews")
      .join("critics", "reviews.critic_id", "critics.critic_id")
      .select("*")
      .where({"movie_id":movieId})
      .then((array) => array.map(addCritic));
}



module.exports = {
    list,
    read,
    readTheaters,
    readReviews,
}