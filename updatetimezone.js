const axios = require('axios');
const { City } = require('./models/mod'); // adjust path to your models
require('dotenv').config();

const API_KEY = process.env.BIGDATACLOUD_KEY || 'bdc_7e5314c05fa94943911639ab0a9744cc';

async function updateTimezones() {
  try {
    const cities = await City.findAll();

    for (let city of cities) {
      if (city.latitude && city.longitude) {
        try {
          const response = await axios.get('https://api.bigdatacloud.net/data/timezone-by-location', {
            params: {
              latitude: city.latitude,
              longitude: city.longitude,
              key: API_KEY
            }
          });

          // Use the correct field ianaTimeId
          const timezone = response.data.ianaTimeId || null;

          await city.update({ timezone });

          console.log(`Updated ${city.name} -> ${timezone}`);
        } catch (err) {
          console.log(`Failed for ${city.name}: ${err.message}`);
        }
      } else {
        console.log(`${city.name} does not have latitude/longitude`);
      }
    }

    console.log('Timezone update completed!');
  } catch (error) {
    console.error('Error fetching cities from DB:', error.message);
  }
}

updateTimezones();
