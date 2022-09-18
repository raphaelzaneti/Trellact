const express = require('express')
const router = express.Router()

const LabelsController = require('../controllers/LabelsController')

router.post('/set-labels', LabelsController.setCardLabels)

module.exports = router