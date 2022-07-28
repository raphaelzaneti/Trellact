const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/from-board/all', UserController.getAllMembersFromBoard)
router.get('/from-card/all', UserController.getAllMembersFromCard)

module.exports = router