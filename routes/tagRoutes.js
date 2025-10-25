const express = require('express');
const router = express.Router();
const tagController = require('../controller/tagcontroller');
const middleware=require('../utils/middleware')

// ✅ Create new tag
router.post('/createtags',middleware.verifyToken,middleware.allowRoles('Admin','Super Admin','Manager'), tagController.createTag);

// ✅ Get all tags
router.get('/getalltags', tagController.getAllTags);

// ✅ Get single tag by ID
router.get('/gettag/:id', tagController.getTagById);

// ✅ Update tag
router.put('/updatetag/:id',middleware.verifyToken,middleware.allowRoles('Admin','Super Admin','Manager'), tagController.updateTag);

// ✅ Toggle tag status (active/inactive)
router.patch('/togglestatus/:id',middleware.verifyToken,middleware.allowRoles('Admin','Super Admin','Manager'), tagController.toggleTagStatus);

// ✅ Delete tag
router.delete('/deletetag/:id',middleware.verifyToken,middleware.allowRoles('Admin','Super Admin','Manager'), tagController.deleteTag);

module.exports = router;
