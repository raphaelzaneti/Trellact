require('dotenv').config()
const {conn, runQuery} = require('../db/db')


module.exports = class CardController{

    static async createCard(req, res){
        const listId = req.body.params.list_id
        const cardName = req.body.params.card_name
        const createdBy = req.body.params.created_by

        const query = `INSERT INTO cards(list_id, card_name, created_by) VALUES (${listId}, "${cardName}", ${createdBy})`
        
        function runCreateQuery(query, description) {
            conn.query(query, async (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(description)
                    console.log({card_id: data.insertId, card_name: cardName, list_id: listId})
                    await res.send({card_id: data.insertId, card_name: cardName, list_id: listId})
                }
            })
        }

        runCreateQuery(query, `Card ${cardName} added to db in list id ${listId}`)
    }

    static async getAllCards(req, res){
        const listId = req.query.list_id
        const query = `SELECT * FROM cards WHERE list_id = ${listId}`
 
        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Got all lists from list ${listId}`)
                
                const dbCheck = await data.map(e => {
                    return {card_id: e.card_id, card_name: e.card_name}
                })
                console.log(dbCheck)
                res.send(dbCheck)
            }
        })
    }

}