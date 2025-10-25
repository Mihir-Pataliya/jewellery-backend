const { Tag, Product, ProductTags } = require('../models/mod');


const createTag = async (req, res) => {
  try {
    const { name, slug, description, status } = req.body;

    
    const existingTag = await Tag.findOne({ where: { slug } });
    if (existingTag) {
      return res.status(400).json({ message: 'Tag with this slug already exists' });
    }

    const tag = await Tag.create({
      name,
      slug,
      description,
      status: status !== undefined ? status : true,
      createdBy: req.user.roleId,
      updatedBy: req.user.roleId
    });

    return res.status(201).json({
      message: 'Tag created successfully',
      tag
    });
  } catch (error) {
    console.error('Error creating tag:', error);
    return res.status(500).json({ message: 'Internal Server Error', err: error.message });
  }
};


const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: [] } 
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: [] }
        }
      ]
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    return res.status(200).json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, status } = req.body;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await tag.update({ name, slug, description, status });

    return res.status(200).json({
      message: 'Tag updated successfully',
      tag
    });
  } catch (error) {
    console.error('Error updating tag:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    
    await ProductTags.destroy({ where: { tagId: id } });

  
    await tag.destroy();

    return res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const toggleTagStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    tag.status = !tag.status; 
    await tag.save();

    return res.status(200).json({
      message: `Tag status updated to ${tag.status ? 'Active' : 'Inactive'}`,
      tag
    });
  } catch (error) {
    console.error('Error toggling tag status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
  toggleTagStatus
};
