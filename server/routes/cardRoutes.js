const express = require('express')
const router = express.Router()

const CardController = require('../controllers/CardController')

router.post('/create', CardController.createCard)
router.post('/edit-name', CardController.editCardName)
router.get('/bylist', CardController.getAllCards)
router.post('/sort', CardController.sortCards)
router.get('/currentposition', CardController.getCurrentPosition)
router.post('/remove', CardController.removeCard)
router.post('/set-member', CardController.setCardMember)

module.exports = router