const express = require('express')
const router = express.Router()

const CardController = require('../controllers/CardController')

router.post('/create', CardController.createCard)
router.get('/bylist', CardController.getAllCards)

module.exports = router