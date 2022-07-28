const mysql = require('mysql')
require('dotenv').config()
const {conn, runQuery} = require('../db/db')

module.exports = class UserController{
    
    static async getAllMembersFromBoard(req, res){
        const boardId = req.query.board_id
        
        const query = `SELECT user_id, first_name, last_name, login 
            FROM users 
                INNER JOIN boards_members ON boards_members.member_id=users.user_id 
                    WHERE boards_members.board_id=${boardId}
        `

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })
        
    }

    static async getAllMembersFromCard(req, res){
        const cardId = req.query.card_id

        console.log(cardId)
        const query = `SELECT member_id FROM cards_members WHERE card_id=${cardId}`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })
    }

    

}