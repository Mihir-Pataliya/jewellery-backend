'use strict';
const express = require('express');
const router = express.Router();
const cityController = require('../controller/citycontroller'); // adjust path if needed

// Route to CREATE a new city
router.post('/createcity', cityController.createCity);

router.post('/createcitiesbulk', cityController.createCitiesBulk);

// Route to GET all cities
router.get('/getallcities', cityController.getAllCities);

// Route to GET a single city by id
router.get('/getcity/:id', cityController.getCityById);

// Route to UPDATE a city by id
router.put('/updatecity/:id', cityController.updateCity);

// Route to DELETE a city by id
router.delete('/deletecity/:id', cityController.deleteCity);

module.exports = router;
