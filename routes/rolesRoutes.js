const express=require('express')
const routes=express.Router()
const rolecontrollers=require('../controller/rolecontroller')

routes.post('/createrole',rolecontrollers.createRole)
routes.get('/getallroles',rolecontrollers.getAllRoles)
routes.get('/getrolebyid/:id',rolecontrollers.getRoleById)
routes.put('/updaterole/:id',rolecontrollers.updateRole)
routes.delete('/deleterole/:id',rolecontrollers.deleteRole)

module.exports=routes;