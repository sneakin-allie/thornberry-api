const knex = require('knex');

const SightingsService = {
    getAllSightings(knex) {
        return knex
            .select("*")
            .from("sightings");
    },

    getByEmail(knex, email) {
        return knex
            .from("sightings")
            .select("*")
            .where("email", email)
    },
   
    insertSighting(knex, newSighting) {
        return knex
            .insert(newSighting)
            .into("sightings")
            .returning("*")
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex
            .from("sightings")
            .select("*")
            .where("id", id)
            .first()
    },

    deleteSighting(knex, id) {
        return knex("sightings")
            .where({ id })
            .delete()
    },

    updateSighting(knex, id, newSightingFields) {
        return knex("sightings")
            .where({ id })
            .update(newSightingFields)
    }
};

module.exports = SightingsService