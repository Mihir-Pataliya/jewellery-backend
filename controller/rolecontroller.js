const sequelize=require('../db')
const{DataTypes}=require('sequelize')
const Role = require('../models/role') (sequelize,DataTypes);

const createRole = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Role name is required' });
    }

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ success: false, message: 'Role already exists' });
    }

    const role = await Role.create({
      name,
      description,
      status: status || 'active',
      createdBy: 1,
       updatedBy: 1

    });

    res.status(201).json({ success: true, message: 'Role created successfully', data: role });
  } catch (error) {
    console.error('Create Role Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', err: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error('Get All Roles Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error('Get Role By ID Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

    if (name) role.name = name;
    if (description) role.description = description;
    if (status) role.status = status;

    role.updatedBy = req.user.id;
    await role.save();

    res.status(200).json({ success: true, message: 'Role updated successfully', data: role });
  } catch (error) {
    console.error('Update Role Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

    await role.destroy();
    res.status(200).json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Delete Role Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
