const { Area, City } = require('../models/mod'); 

const createArea = async (req, res) => {
  try {
    const { name, cityId, pincode, status } = req.body;

    if (!name || !cityId) {
      return res.status(400).json({ message: "Name and City ID are required" });
    }

    const area = await Area.create({
      name,
      cityId,
      pincode: pincode || null,
      status: status !== undefined ? status : true
    });

    return res.status(201).json({ message: "Area created successfully", area });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.findAll({
      include: [{ model: City, as: 'city', attributes: ['id', 'name'] }]
    });
    return res.status(200).json({ areas });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findByPk(id, {
      include: [{ model: City, as: 'city', attributes: ['id', 'name'] }]
    });

    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }

    return res.status(200).json({ area });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cityId, pincode, status } = req.body;

    const area = await Area.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }

    await area.update({
      name: name || area.name,
      cityId: cityId || area.cityId,
      pincode: pincode !== undefined ? pincode : area.pincode,
      status: status !== undefined ? status : area.status
    });

    return res.status(200).json({ message: "Area updated successfully", area });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findByPk(id);

    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }

    await area.destroy();
    return res.status(200).json({ message: "Area deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea
};
