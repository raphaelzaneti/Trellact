const mysql = require('mysql')
require('dotenv').config()
const {conn, runQuery} = require('../db/db')

module.exports = class UserController{
    
    static async getAllMembersFromBoard(req, res){
        const boardId = req.query.board_id
        const cardId = req.query.card_id
        
        const query = `SELECT user_id, first_name, last_name, login 
            FROM users 
                INNER JOIN boards_members ON boards_members.member_id=users.user_id 
                    WHERE boards_members.board_id=${boardId}
        `

        const cardMembersQuery = `SELECT member_id FROM cards_members WHERE card_id=${cardId}`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const boardMembers = data
                let cardMembersId
                await conn.query(cardMembersQuery, async (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cardMembersId = await data
                        
                        boardMembers.map(e => {
                            e.is_member = false
                            
                            cardMembersId.map(el =>{
                                if(e.user_id === el.member_id){
                                    e.is_member = true
                                }
                            })
                        })

                        res.send(boardMembers)
                    }
                })
            }
        })
        
    }

    static async getAllMembersFromCard(req, res){
        const cardId = req.query.card_id

        const query = `SELECT DISTINCT user_id, first_name, last_name, login FROM cards_members  
            LEFT JOIN users ON member_id=user_id WHERE card_id=${cardId}
        `

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })
    }



}