const { State } = require('../models/mod');

const createState = async (req, res) => {
  try {
    const { name, code, country, status } = req.body;

    
    const existingState = await State.findOne({ where: { name } });
    if (existingState) {
      return res.status(400).json({ message: 'State already exists' });
    }

    const state = await State.create({ name, code, country, status });
    return res.status(201).json({
      message: 'State created successfully',
      data: state
    });
  } catch (error) {
    console.error('Error creating state:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


const getAllStates = async (req, res) => {
  try {
    const states = await State.findAll({
      order: [['name', 'ASC']],
      attributes: ['id', 'name', 'code', 'country', 'status']
    });

    return res.status(200).json({
      message: 'All states fetched successfully',
      count: states.length,
      data: states
    });
  } catch (error) {
    console.error('Error fetching states:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    return res.status(200).json({
      message: 'State fetched successfully',
      data: state
    });
  } catch (error) {
    console.error('Error fetching state:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, country, status } = req.body;

    const state = await State.findByPk(id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    await state.update({ name, code, country, status });
    return res.status(200).json({
      message: 'State updated successfully',
      data: state
    });
  } catch (error) {
    console.error('Error updating state:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    await state.destroy();
    return res.status(200).json({ message: 'State deleted successfully' });
  } catch (error) {
    console.error('Error deleting state:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};




const createMultipleStates = async (req, res) => {
  try {
    const statesData = req.body; 

    if (!Array.isArray(statesData)) {
      return res.status(400).json({ message: "Data should be an array" });
    }

    
    const states = await State.bulkCreate(statesData);

    return res.status(201).json({
      message: "All states added successfully",
      count: states.length,
      data: states
    });
  } catch (error) {
    console.error("Error inserting states:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};



module.exports = {
  createState,
  getAllStates,
  createMultipleStates,
  getStateById,
  updateState,
  deleteState
};
