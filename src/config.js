module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || `development`,
    DATABASE_URL: process.env.DATABASE_URL || `postgresql://allison_schulman@localhost/sightings`,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || `postgresql://allison_schulman@localhost/sightings_test`,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || `https://desolate-meadow-47002.herokuapp.com`
};