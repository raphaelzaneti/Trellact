const mysql = require('mysql')
require('dotenv').config()
const { conn, runQuery } = require('../db/db')


module.exports = class ListsController {

    static async createList(req, res) {
        const name = req.query.listName
        const board = req.query.board
        const position = req.query.listPosition

        const query = `INSERT INTO Lists(list_name, board_id, position) VALUES('${name}', ${board}, ${position})`

        runQuery(query, `List ${name} added to db`)
        res.send({ list: name, position: position })
    }

    static async getAllPositions(req, res) {
        const board = req.query.board_id
        const currentList = req.query.list_id

        console.log(board, currentList)

        const query = `(SELECT 'total' AS type, MAX(position) AS value FROM lists WHERE board_id=${board}) UNION (SELECT 'position' AS type, position FROM lists WHERE list_id=${currentList})`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {

                const dbCheck = await data
                res.send(dbCheck)
            }
        })

    }

    static async updatePositions(req, res) {
        const board = req.body.data.board_id
        const currentList = req.body.data.list_id
        const currentListPosition = req.body.data.current_position
        const newListPosition = req.body.data.new_position
        const nOfLists = req.body.data.total_lists[0].value
        let allLists

        const getPositionsQuery = `select list_id, position from lists where board_id=${board}`
        console.log(getPositionsQuery)

        await conn.query(getPositionsQuery, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                allLists = await data
                changeListPosition()
            }
        })

        if (currentListPosition === newListPosition) {
            return
        }

        function changeListPosition() {
            if (currentListPosition < newListPosition) {
                allLists.map(e => {
                    if (e.position > currentListPosition && e.position <= newListPosition) {
                        e.new_position = e.position - 1
                    } else {
                        e.new_position = e.position
                    }

                    if (e.list_id === currentList) {
                        e.new_position = newListPosition
                    }
                })

            } else if (currentListPosition > newListPosition) {
                allLists.map(e => {
                    if (e.position >= newListPosition && e.position < currentListPosition) {
                        e.new_position = e.position + 1
                    } else {
                        e.new_position = e.position
                    }

                    if (e.list_id === currentList) {
                        e.new_position = newListPosition
                    }
                })
            }

            let query = `
            UPDATE lists
                SET position = 
                    CASE list_id
                        ${allLists.map((e) => ' WHEN ' + (e.list_id) + ' THEN ' + e.new_position)}
                END
            WHERE board_id=${board} AND list_id IN(${allLists.map(e => " " + e.list_id)})
            `

            query = query.replace(/, WHEN/gi, ' WHEN')

            try {
                runQuery(query, `Positions of lists updated in board ${board}`)
                res.send({ success: true })

            } catch (error) {
                res.send({ success: false })
            }

            return
        }

    }

    static async editListName(req, res) {
        const listId = req.body.data.id
        const listNewName = req.body.data.new_name

        const query = `UPDATE lists SET list_name="${listNewName}" WHERE list_id=${listId};`

        runQuery(query, `List ${listNewName} updated into db`)

        res.send({ list: listNewName, id: listId })
    }

    static async getAllLists(req, res) {
        const board = req.query.board
        const query = `SELECT * FROM Lists WHERE board_id = ${board}`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Got all lists from board ${board}`)

                const dbCheck = await data.map(e => {
                    return { position: e.position, list_id: e.list_id, list_name: e.list_name }
                })
                console.log(dbCheck)
                res.send(dbCheck)
            }
        })
    }

    static async removeList(req, res) {
        const id = req.query.id
        const name = req.query.name

        const query = `DELETE FROM lists WHERE list_id=${id}`

        runQuery(query, `List ${name} removed from db`)
        res.send('list ' + name + ' removed')
    }

}