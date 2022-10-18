const mysql = require('mysql')
require('dotenv').config()
const {conn, runQuery} = require('../db/db')

module.exports = class CommentController{

    static async getAllCommentsFromCard(req,res){
        const cardId = req.query.card_id
        
        const query = `SELECT * FROM Comments LEFT JOIN users ON users.user_id = comments.user_id WHERE card_id=${cardId}`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
                res.send({success: false})
            } else {
                res.send(data)
            }
        })
    }

    static async saveNewComment(req, res){
        const cardId = req.body.params.card_id
        const userId = req.body.params.user_id
        const comment = req.body.params.content
        
        const query = `
        INSERT INTO Comments(card_id, user_id, content, post_time, edited) 
        VALUES(${cardId}, ${userId}, "${comment}", NOW(), 0)
        `
        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
                res.send({success: false})
            } else {
                res.send({success: true})
            }
        })
    }

}