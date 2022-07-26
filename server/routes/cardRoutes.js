const express = require('express')
const router = express.Router()

const CardController = require('../controllers/CardController')

router.post('/create', CardController.createCard)
router.get('/bylist', CardController.getAllCards)
router.post('/sort', CardController.sortCards)
router.get('/currentposition', CardController.getCurrentPosition)

module.exports = router