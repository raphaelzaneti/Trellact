require('dotenv').config()
const { conn, runQuery } = require('../db/db')

module.exports = class TagsController {

    static async getAllTags(req, res){
        console.log('called all tags')
        const query = `SELECT * FROM tags`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })
    }

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
                if(err.code === "ER_DUP_ENTRY"){ //Case the added caption already exists in tags table
                    const querySelectExistingTag = `SELECT tag_id FROM tags WHERE tag_caption="${caption}"` //So it catches the tag_id from existing tag_caption
                    await conn.query(querySelectExistingTag, async (err, data) => {
                        if (err) {
                            console.log(err)
                            res.send({success: false, message: "Error when selecting existent tag to the board"})
                        } else {
                            await data
                            const queryInsertExistingTag = `INSERT INTO boards_tags(board_id, tag_id) values (${boardId}, ${data[0].tag_id});`
                            await conn.query(queryInsertExistingTag, async (err, data) => {
                                if (err) {
                                    console.log(err)
                                    res.send({success: false, message: "Error when adding tag to the board"})
                                } else {
                                    res.send({success: true, message: 'Tag inserted'})
                                }
                            })
                        }
                    })

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


    static async getAllBoardsByTag(req, res){
        const query = `SELECT t.tag_id, bt.boards_tags_id, b.board_id, 
                        b.board_name, t.tag_caption
                                FROM tags AS t 
                                    LEFT JOIN boards_tags AS bt ON t.tag_id=bt.tag_id 
                                        LEFT JOIN boards AS b ON b.board_id=bt.board_id;
        `

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
                res.send({success: false, message: "Error when getting all tags and boards"})
            } else {
                const groupedTags = {}
                data.map(e => {
                    if(Object.keys(groupedTags).includes(e.tag_id.toString())){
                        groupedTags[e.tag_id].push(e)
                    } else{
                        groupedTags[e.tag_id] = [e]
                    }
                })

                res.send({success: true, message: 'All tags and boards', data: groupedTags})
            }
        })
        
    }


}