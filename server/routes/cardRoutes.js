const express = require('express')
const router = express.Router()

const CardController = require('../controllers/CardController')

router.post('/create', CardController.createCard)
router.post('/edit-name', CardController.editCardName)
router.get('/bylist', CardController.getAllCards)
router.post('/sort', CardController.sortCards)
router.get('/currentposition', CardController.getCurrentPosition)
router.post('/move-card', CardController.setPosition)
router.post('/remove', CardController.removeCard)
router.post('/set-member', CardController.setCardMember)
router.get('/get-labels', CardController.getCardLabels)

module.exports = router