'use strict';
const { City, State } = require('../models/mod');
const axios = require('axios'); // import City and State models

// CREATE a new city
const createCity = async (req, res) => {
  try {
    const { name, code, stateId, status, timezone, latitude, longitude } = req.body;

    // Check if state exists
    const state = await State.findByPk(stateId);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    const city = await City.create({
      name,
      code,
      stateId,
      status,
      timezone,
      latitude,
      longitude
    });

    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll({
      include: [{ model: State, as: 'state' }] // include state info
    });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single city by id
const getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByPk(id, {
      include: [{ model: State, as: 'state' }]
    });

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a city
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, stateId, status, timezone, latitude, longitude } = req.body;

    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    if (stateId) {
      const state = await State.findByPk(stateId);
      if (!state) {
        return res.status(404).json({ message: 'State not found' });
      }
    }

    await city.update({ name, code, stateId, status, timezone, latitude, longitude });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a city
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    await city.destroy();
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const createCitiesBulk = async (req, res) => {
  try {
    const citiesData = req.body; // Array of cities from Postman
    const citiesToInsert = [];

    for (let city of citiesData) {
      // 1️⃣ Check if state exists
      const state = await State.findByPk(city.stateId);
      if (!state) {
        return res.status(400).json({ message: `State with id ${city.stateId} not found` });
      }

      // 2️⃣ Initialize variables
      let latitude = null;
      let longitude = null;
      let timezone = null;

      try {
        // 3️⃣ Get latitude & longitude automatically
        const geoResp = await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client', {
          params: { locality: city.name, countryCode: 'IN', key: 'bdc_7e5314c05fa94943911639ab0a9744cc' }
        });

        if (geoResp.data) {
          latitude = geoResp.data.latitude || null;
          longitude = geoResp.data.longitude || null;
        }

        // 4️⃣ Get timezone using correct field
        if (latitude && longitude) {
          const tzResp = await axios.get('https://api.bigdatacloud.net/data/timezone-by-location', {
            params: { latitude, longitude, key: 'bdc_7e5314c05fa94943911639ab0a9744cc' }
          });

          timezone = tzResp.data.ianaTimeId || null; // ✅ Correct field
        }

      } catch (apiErr) {
        console.log(`Could not fetch lat/lng/timezone for ${city.name}: ${apiErr.message}`);
      }

      // 5️⃣ Prepare city object
      citiesToInsert.push({
        name: city.name,
        code: city.code,
        stateId: city.stateId,
        status: city.status !== undefined ? city.status : true,
        latitude,
        longitude,
        timezone
      });
    }

    // 6️⃣ Insert all cities at once
    const insertedCities = await City.bulkCreate(citiesToInsert);
    res.status(201).json(insertedCities);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// EXPORT all controller functions
module.exports = {
  createCity,
  getAllCities,
  createCitiesBulk,
  getCityById,
  updateCity,
  deleteCity
};
