const path = require('path');
const express = require('express');
const xss = require('xss');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
    firstName: xss(user.firstname),
    lastName: xss(user.lastname),
    email: xss(user.email),
    password: xss(user.password)
})

usersRouter
    .route('/new')
    .get((req, res, next) => {
        const knexInstance = req.app.get("db")
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                res.status(200).json(users.map(serializeUser))
            })
            .catch(next)
    })
    // POST to sign up a new user
    .post(jsonParser, (req, res, next) => {
        const { firstName, lastName, email, password } = req.body;
        const newUser = { email, password };

        for (const [key, value] of Object.entries(newUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing "${key}" in request body` }
                })
            }
        }

        UsersService.getByEmail(
            req.app.get("db"),
            email
        )
            .then(existingUser => {
                if (existingUser) {
                    return res.status(400).json({
                        error: { message: `Email already exists`}
                    })
                } else {
                    newUser.firstname = firstName;
                    newUser.lastname = lastName;
                    newUser.email = email;
                    newUser.password = password;

                    UsersService.insertUser(
                        req.app.get("db"),
                        newUser
                    )
                        .then(user => {
                            res
                                .status(201)
                                .location(path.posix.join(req.originalUrl, `/${user.email}`))
                                .json(serializeUser(user))
                        })
                        .catch(next)
                        }
            })
})

usersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get("db")
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                res
                    .status(200)
                    .json(users.map(serializeUser))
            })
            .catch(next)
    })

    // POST to log in an existing user
    .post(jsonParser, (req, res, next) => {
        console.log("req.body.email:", req.body.email)
        console.log("req.body.password:", req.body.password)

        UsersService.getByEmailAndPassword(
            req.app.get("db"),
            req.body.email,
            req.body.password 
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                return res.status(200).json(serializeUser(user))
            })
            .catch(next)
        })

usersRouter
    .route('/:email')
    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get("db"),
            req.params.email
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { firstName, lastName, password } = req.body;

        const userToUpdate = {};
        if (firstName) {
            userToUpdate.firstname = firstName
        }
        if (lastName) {
            userToUpdate.lastname = lastName
        }
        if (password) {
            userToUpdate.password = password
        }

            UsersService.updateUser(
                req.app.get("db"),
                req.params.email,
                userToUpdate
            )
                .then(updatedUser =>{
                    res.status(200).json(updatedUser)
                })
                .catch(next)
    })

module.exports = usersRouter