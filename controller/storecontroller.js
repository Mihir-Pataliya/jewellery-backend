// controllers/storeController.js

const { Store, City, Area,sequelize } = require('../models/mod');
const { Op } = sequelize;

// CREATE a new store
const createStore = async (req, res) => {
  try {
    const { name, code, address, cityId, areaId, phone, email, status } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Name and Code are required." });
    }

    const cityExists = await City.findByPk(cityId);
   if (!cityExists) {
  return res.status(400).json({ message: "Invalid cityId. City not found in database." });
  }

    const areaExists = await Area.findByPk(areaId);
    if (!areaExists) {
      return res.status(400).json({ message: "Invalid areaId. Area not found in database." });
    }


    const existingStore = await Store.findOne({ where: { code } });
    if (existingStore) {
      return res.status(400).json({ message: "Store code already exists." });
    }

    const newStore = await Store.create({
      name,
      code,
      address,
      cityId,
      areaId,
      phone,
      email,
      status
    });

    return res.status(201).json({ message: "Store created successfully", store: newStore });
  } catch (error) {
    console.error("Error creating store:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




const getAllStores = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', cityId, areaId } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;


    const whereConditions = {};


    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } },
      ];
    }


    if (cityId) whereConditions.cityId = cityId;
    if (areaId) whereConditions.areaId = areaId;

    const totalStores = await Store.count({ where: whereConditions });

    const stores = await Store.findAll({
      where: whereConditions,
      include: [
        { model: City, as: 'city', attributes: ['id', 'name'] },
        { model: Area, as: 'area', attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: limitNumber,
      offset
    });


    return res.status(200).json({
      message: "Stores fetched successfully",
      total: totalStores,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalStores / limitNumber),
      data: stores
    });

  } catch (error) {
    console.error("Error fetching stores:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id, {
      include: [
        { model: City, as: 'city' },
        { model: Area, as: 'area' },
      ]
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    return res.status(200).json(store);
  } catch (error) {
    console.error("Error fetching store:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, cityId, areaId, phone, email, status } = req.body;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    await store.update({
      name,
      address,
      cityId,
      areaId,
      phone,
      email,
      status
    });

    return res.status(200).json({ message: "Store updated successfully", store });
  } catch (error) {
    console.error("Error updating store:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    await store.destroy();
    return res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error("Error deleting store:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore
};
