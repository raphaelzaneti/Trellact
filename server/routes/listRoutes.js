const express = require('express')
const router = express.Router()

const ListsController = require('../controllers/ListsController')

router.get('/create', ListsController.createList)
router.post('/edit/:id', ListsController.editListName)
router.get('/remove', ListsController.removeList)
router.get('/all', ListsController.getAllLists)

module.exports = router