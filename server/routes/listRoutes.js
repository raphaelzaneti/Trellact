const express = require('express')
const router = express.Router()

const ListsController = require('../controllers/ListsController')

router.get('/create', ListsController.createList)
router.get('/remove', ListsController.removeList)
router.get('/all', ListsController.getAllLists)

module.exports = router