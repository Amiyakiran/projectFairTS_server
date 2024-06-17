const express = require('express')
const { registerController, loginController, updateProfileController } = require('./controllers/userController')
const jwtMiddleWare = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')
const { addProjectController, homeProjectController, allProjectController, UserProjectController, editUserProjectController, deleteUserProjectController } = require('./controllers/projectController')



const router = new express.Router()



//path to register
router.post('/register',registerController)

//path to login
router.post('/login',loginController)

//path to add a project
router.post('/add-project',jwtMiddleWare,multerConfig.single('projectImage'),addProjectController)

//path to get home project
router.get('/home-project',homeProjectController)

//path to get all project
router.get('/all-project',jwtMiddleWare,allProjectController)

//path to get user project
router.get('/user-project',jwtMiddleWare,UserProjectController)

//path to edit the user project
router.put('/edit-project/:id',jwtMiddleWare,multerConfig.single('projectImage'),editUserProjectController)

//path to delete the project
router.delete('/delete-project/:id',jwtMiddleWare,deleteUserProjectController)

//path to update profile
router.put('/update-profile',jwtMiddleWare,multerConfig.single('profile'),updateProfileController)




module.exports = router