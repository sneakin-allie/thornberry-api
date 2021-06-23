/*
~~~THESE NEED TO BE FIXED~~~

const knex = require('knex');
const app = require('./../src/app');
const supertest = require('supertest');
const { expect } = require('chai');
const { TEST_DATABASE_URL } = require('./../src/config');

describe('Wildlifer users API:', function () {
  let db;
  let users = [
    {
      "firstname": "Allison",
      "lastname": "Schulman",
      "email": "allison.d.schulman@gmail.com",
      "password": "Password123"
    },
    {
      "firstname": "Justin",
      "lastname": "Iwinski",
      "email": "just.winski@gmail.com",
      "password": "Password456"
    },
    {
      "firstname": "Leah",
      "lastname": "Thomas",
      "email": "leah.thomas@gmail.com",
      "password": "Password555"
    }
  ]

  before('make knex instance', () => {  
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL,
    })
  
    app.set('db', db)
  });

  before('cleanup', () => db.raw('DELETE from SIGHTINGS;'));
  
  before('cleanup', () => db.raw('DELETE from USERS;'));

  afterEach('cleanup', () => db.raw('DELETE from SIGHTINGS;')); 

  afterEach('cleanup', () => db.raw('DELETE from USERS;')); 

  after('disconnect from the database', () => db.destroy()); 

  describe('GET /api/users', () => {

    beforeEach('insert some users', () => {
      return db('users').insert(users);
    })

    it('should respond to GET `/api/users` with an array of users and status 200', function () {
      return supertest(app)
        .get('/api/users')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
        });
    });

  });

  describe('POST /api/users', function () {

    it('should create and return a new user when provided valid data', function () {
      const newUser = {
        "firstName": "Alfredo",
        "lastName": "Salazar",
        "email": "alfredo.salazar@gmail.com",
        "password": "Password100"
      };

      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('firstName', 'lastName', 'email')
        });
    });

  });

  describe('PATCH /api/users/:email', () => {

    beforeEach('insert some users', () => {
      return db('users').insert(users);
    })

    it('should update a user when given valid data and an email', function () {
      const newUser = {
        "firstName": "Allison",
        "lastName": "Iwinski",
        "password": "password123"
      };
      
      let doc; 
      return db('users') 
        .first()
        .then(_doc => {
          doc = _doc
          return supertest(app)
            .patch(`/api/users/${doc.email}`)
            .send(newUser)
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.equal(1);
          expect(res.body).to.be.a("number");
        });
    });

  });

  describe('DELETE /api/users/:email', () => {

    beforeEach('insert some users', () => {
      return db('users').insert(users);
    })

    it('should delete a user by email', () => {
      return db('users')
        .first()
        .then(doc => { 
          return supertest(app)
            .delete(`/api/users/${doc.email}`)
            .expect(204)
        })
    });

  });


});

describe('Wildlifer sightings API:', function () {
  let db;
  let sightings = [
    {
      "email": "allison.d.schulman@gmail.com",
      "date": "06-15-2021",
      "location": "West Hartford Reservoir 6",
      "animal": "Black bear",
      "notes": "On my run, as far from the parking lots and into the woods as could be",
      "photos": ""
    },
    {
      "email": "allison.d.schulman@gmail.com",
      "date": "06-14-2021",
      "location": "Avon",
      "animal": "Black bear",
      "notes": "Big guy came to the hummerbird feeder near the porch",
      "photos": ""
    },
    {
      "email": "just.winski@gmail.com",
      "date": "06-12-2021",
      "location": "Indian Head Mountain, Catskills",
      "animal": "Ruffed grouse",
      "notes": "V aggresive and chased after us on the trail",
      "photos": ""
    }
  ]

  before('make knex instance', () => {  
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL,
    })
  
    app.set('db', db)
  });

  describe('GET /api/sightings/list', () => {

    beforeEach('insert some sightings', () => {
      return db('sightings').insert(sightings);
    })

    it('should respond to GET `/api/sightings/list` with an array of sightings and status 200', function () {
      return supertest(app)
        .get('/api/sightings/list')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
        });
    });

  });

  describe('POST /api/sightings/list', function () {

    it('should create and return a new sighting when provided valid data', function () {
      const newSighting = {
        "email": "allison.d.schulman@gmail.com",
        "id": 4,
        "date": "06-12-2021",
        "location": "Indian Head Mountain, Catskills",
        "animal": "Brown snake",
        "notes": "One of the largest I've seen in the wild",
        "photos": ""
      };

      return supertest(app)
        .post('/api/sightings/list')
        .send(newSighting)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'date', 'location', 'animal', 'notes', 'photos')
        });
    });

  });

  describe('PATCH /api/sightings/:id', () => {

    beforeEach('insert some sightings', () => {
      return db('sightings').insert(sightings);
    })

    it('should update a sighting when given valid data and an id', function () {
      const updatedSighting = {
        "email": "allison.d.schulman@gmail.com",
        "id": 4,
        "notes": "Am I the only one who likes snakes?"
      };
      
      let doc;
      return db('sightings')
        .first()
        .then(_doc => {
          doc = _doc
          return supertest(app)
            .patch(`/api/sightings/${doc.id}`)
            .send(updatedSighting)
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.equal(1);
          expect(res.body).to.be.a("number");
        });
    });

  });

  describe('DELETE /api/sightings/:id', () => {

    beforeEach('insert some sightings', () => {
      return db('sightings').insert(sightings);
    })

    it('should delete a sighting by id', () => {
      return db('sightings')
        .first()
        .then(doc => {
          return supertest(app)
            .delete(`/api/sightings/${doc.id}`)
            .expect(204)
        })
    });

  });

});

*/