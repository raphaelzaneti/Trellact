const mysql = require('mysql')
require('dotenv').config()
const {conn, runQuery} = require('../db/db')

module.exports = class ListsController{

    static async getAllBoards(req, res){
        const userId = req.query.user_id

        const query = `SELECT * FROM boards WHERE created_by=${userId}`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Got all boards from user ${userId}`)
                
                const dbCheck = await data.map(e => {
                    return {board_id: e.board_id, board_name: e.board_name}
                })
                console.log(dbCheck)
                res.send(dbCheck)
            }
        })
    }

    static async editBoardName(req, res){
        const boardId = req.body.data.id
        const boardNewName = req.body.data.new_name
    
        const query = `UPDATE boards SET board_name="${boardNewName}" WHERE board_id=${boardId};`

        runQuery(query, `Board ${boardNewName} updated into db`)

        res.send({board: boardNewName, id: boardId})
    }
}