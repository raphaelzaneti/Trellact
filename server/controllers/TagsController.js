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

    static async createNewTag(req, res){
        const caption = req.body.data.tag_caption
        const boardId = req.body.data.board_id
        const query = `INSERT INTO tags(tag_caption) VALUES ("${caption}")`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
                if(err.code === "ER_DUP_ENTRY"){
                    res.send({success: false, message: "This tag already exists"})
                }
            } else {
                const newTagId = data.insertId
                const queryIntermediaryTable = `INSERT INTO boards_tags(board_id, tag_id) values (${boardId}, ${newTagId});`
                await conn.query(queryIntermediaryTable, async (err, data) => {
                    if (err) {
                        console.log(err)
                        res.send({success: false, message: "Error when inserting tag"})
                    } else {
                        res.send({success: true, tag_id: newTagId, message: 'Tag inserted'})
                    }
                })
            }
        })
    }


}