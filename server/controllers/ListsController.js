const mysql = require('mysql')
require('dotenv').config()
const {conn, runQuery} = require('../db/db')


module.exports = class ListsController{
    
    static async createList(req, res){
        const name = req.query.listName
        const board = req.query.board
        const position = req.query.listPosition

        const query = `INSERT INTO Lists(list_name, board_id, position) VALUES('${name}', ${board}, ${position})`

        runQuery(query, `List ${name} added to db`)

        console.log(query)
        res.send({list: name, position: position})
    }

    static async getAllLists(req, res){
        const board = req.query.board
        const query = `SELECT * FROM Lists WHERE board_id = ${board}`
 
        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Got all lists from board ${board}`)
                
                const dbCheck = await data.map(e => {
                    return {position: e.position, list_id: e.list_id, list_name: e.list_name}
                })
                console.log(dbCheck)
                res.send(dbCheck)
            }
        })
    }

}