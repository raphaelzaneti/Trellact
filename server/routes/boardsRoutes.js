const express = require('express')
const router = express.Router()

const BoardsController = require('../controllers/BoardsController')

router.get('/all', BoardsController.getAllBoards)
router.post('/edit/:id', BoardsController.editBoardName)
router.post('/create', BoardsController.createBoard)

module.exports = router