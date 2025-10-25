'use strict';
const { City, State } = require('../models/mod');
const axios = require('axios'); 

const createCity = async (req, res) => {
  try {
    const { name, code, stateId, status, timezone, latitude, longitude } = req.body;

    
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


const getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll({
      include: [{ model: State, as: 'state' }] 
    });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const citiesData = req.body; 
    const citiesToInsert = [];

    for (let city of citiesData) {
  
      const state = await State.findByPk(city.stateId);
      if (!state) {
        return res.status(400).json({ message: `State with id ${city.stateId} not found` });
      }

    
      let latitude = null;
      let longitude = null;
      let timezone = null;

      try {
        
        const geoResp = await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client', {
          params: { locality: city.name, countryCode: 'IN', key: 'bdc_7e5314c05fa94943911639ab0a9744cc' }
        });

        if (geoResp.data) {
          latitude = geoResp.data.latitude || null;
          longitude = geoResp.data.longitude || null;
        }

      
        if (latitude && longitude) {
          const tzResp = await axios.get('https://api.bigdatacloud.net/data/timezone-by-location', {
            params: { latitude, longitude, key: 'bdc_7e5314c05fa94943911639ab0a9744cc' }
          });

          timezone = tzResp.data.ianaTimeId || null;
        }

      } catch (apiErr) {
        console.log(`Could not fetch lat/lng/timezone for ${city.name}: ${apiErr.message}`);
      }

      
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

    
    const insertedCities = await City.bulkCreate(citiesToInsert);
    res.status(201).json(insertedCities);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createCity,
  getAllCities,
  createCitiesBulk,
  getCityById,
  updateCity,
  deleteCity
};
