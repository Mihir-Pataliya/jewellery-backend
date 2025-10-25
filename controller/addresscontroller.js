'use strict';

const { Address, Area, City, State, User } = require('../models/mod');
const geocoder = require('../utils/geocoders');

const getCoordinates = async (street, building, pincode, area) => {
  const cityName = area.city?.name || '';
  const stateName = area.city?.state?.name || '';
  let fullAddress = [street, building, pincode, cityName, stateName, 'India']
    .filter(Boolean)
    .join(', ');

  let geoData = await geocoder.geocode(fullAddress);
  let latitude = geoData[0]?.latitude || null;
  let longitude = geoData[0]?.longitude || null;

  
  if (!latitude || !longitude) {
    const fallbackAddress = [pincode, cityName, stateName, 'India'].filter(Boolean).join(', ');
    geoData = await geocoder.geocode(fallbackAddress);
    latitude = geoData[0]?.latitude || null;
    longitude = geoData[0]?.longitude || null;
  }

  return { latitude, longitude };
};

const createAddress = async (req, res) => {
  try {
    const { userId, areaId, street, building, pincode, type, isDefault } = req.body;


    const user = await User.findByPk(userId);
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const area = await Area.findByPk(areaId, {
      include: [{ model: City, as: 'city', include: [{ model: State, as: 'state' }] }]
    });
    if (!area) return res.status(400).json({ success: false, message: 'Area not found' });

    const { latitude, longitude } = await getCoordinates(street, building, pincode, area);

    const address = await Address.create({
      userId,
      areaId,
      street,
      building,
      pincode,
      type,
      isDefault,
      latitude,
      longitude
    });

    return res.status(201).json({
      success: true,
      message: 'Address created successfully with coordinates',
      data: address
    });

  } catch (error) {
    console.error('Error creating address:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: [
        { model: Area, as: 'area', include: [{ model: City, as: 'city', include: [{ model: State, as: 'state' }] }] },
        { model: User, as: 'user' }
      ]
    });
    return res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByPk(id, {
      include: [
        { model: Area, as: 'area', include: [{ model: City, as: 'city', include: [{ model: State, as: 'state' }] }] },
        { model: User, as: 'user' }
      ]
    });

    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });

    return res.status(200).json({ success: true, data: address });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, areaId, street, building, pincode, type, isDefault } = req.body;

    const address = await Address.findByPk(id);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });

    let latitude = address.latitude;
    let longitude = address.longitude;

    if (street || building || pincode || areaId) {
      const area = await Area.findByPk(areaId || address.areaId, {
        include: [{ model: City, as: 'city', include: [{ model: State, as: 'state' }] }]
      });
      if (area) {
        const coords = await getCoordinates(street || address.street, building || address.building, pincode || address.pincode, area);
        latitude = coords.latitude;
        longitude = coords.longitude;
      }
    }

    await address.update({
      userId: userId || address.userId,
      areaId: areaId || address.areaId,
      street: street || address.street,
      building: building || address.building,
      pincode: pincode || address.pincode,
      type: type || address.type,
      isDefault: isDefault !== undefined ? isDefault : address.isDefault,
      latitude,
      longitude
    });

    return res.status(200).json({ success: true, message: 'Address updated successfully', data: address });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByPk(id);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });

    await address.destroy();
    return res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
};
