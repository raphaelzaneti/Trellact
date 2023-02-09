require('dotenv').config()
const { conn, runQuery } = require('../db/db')

module.exports = class TagsController {

    static async getAllTagsFromBoard(req, res) {
        
        const boardId = req.query.board_id
        const query = `SELECT t.tag_id, t.tag_caption 
            FROM boards_tags AS bt LEFT JOIN tags AS t 
                ON bt.tag_id=t.tag_id 
            WHERE bt.board_id =${boardId};
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