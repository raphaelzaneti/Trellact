const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')

router.get('/from-card/all', CommentController.getAllCommentsFromCard)
router.post('/save', CommentController.saveNewComment)

module.exports = router