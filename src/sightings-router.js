const path = require('path');
const express = require('express');
const xss = require('xss');
const SightingsService = require('./sightings-service')

const sightingsRouter = express.Router()
const jsonParser = express.json()

const serializeSighting = sighting => ({
    id: sighting.id,
    date: sighting.date,
    location: sighting.location,
    animal: sighting.animal,
    notes: sighting.notes,
    photos: sighting.photos
})

sightingsRouter
    .route('/')
    // POST to add a new sighting
    .post(jsonParser, (req, res, next) => {
        const { email, date, location, animal, notes, photos } = req.body
        const newSighting = { email, date, location, animal, notes, photos }

        SightingsService.insertSighting(
            req.app.get("db"),
            newSighting
        )
            .then(sighting => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${sighting.id}`))
                .json(serializeSighting(sighting))
            })
            .catch(next)
    })

sightingsRouter
    .route('/:email')
    // GET sightings by user email (email is id)
    .get((req, res, next) => {
        SightingsService.getByEmail(
            req.app.get("db"),
            req.params.email
        )
            .then(sightings => {
                res.json(sightings.map(serializeSighting))
            })
            .catch(next)
    })

sightingsRouter
    .route('/:sighting_id')
    .all((req, res, next) => {
        SightingsService.getById(
            req.app.get("db"),
            req.params.sighting_id
        )
            .then(sighting => {
                if (!sighting) {
                    return res.status(404).json({
                        error: { message: `Sighting doesn't exist` }
                    })
                }
                res.sighting = sighting
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeSighting(res.sighting))
    })
    // DELETE a sighting by id
    .delete((req, res, next) => {
        SightingsService.deleteSighting(
            req.app.get("db"),
            req.params.sighting_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    // UPDATE a sighting by id
    .patch(jsonParser, (req, res, next) => {
        const { date, location, animal, notes, photos } = req.body

        const sightingToUpdate = {};
        if (date) {
            sightingToUpdate.date = date
        }
        if (location) {
            sightingToUpdate.location = location
        }
        if (animal) {
            sightingToUpdate.animal = animal
        }
        if (notes) {
            sightingToUpdate.notes = notes
        }
        if (photos) {
            sightingToUpdate.photos = photos
        }

        SightingsService.updateSighting(
            req.app.get("db"),
            req.params.sighting_id,
            sightingToUpdate
        )
            .then(updatedSighting => {
                res.status(200).json(updatedSighting)
            })
            .catch(next)
    })

module.exports = sightingsRouter