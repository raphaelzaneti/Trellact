const express = require('express')
const router = express.Router()

const TagsController = require('../controllers/TagsController.js')

router.get('/from-board/all', TagsController.getAllTagsFromBoard)
router.post('/new-tag', TagsController.createNewTag)

module.exports = router