const express = require('express')
const router = express.Router()

const TagsController = require('../controllers/TagsController.js')

router.get('/from-board/all', TagsController.getAllTagsFromBoard)

module.exports = router