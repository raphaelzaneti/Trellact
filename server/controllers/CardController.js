require('dotenv').config()
const {conn, runQuery} = require('../db/db')


module.exports = class CardController{

    static async createCard(req, res){
        const listId = req.body.params.list_id
        const cardName = req.body.params.card_name
        const createdBy = req.body.params.created_by
        const cardPosition = req.body.params.card_position

        async function runCreateQuery(description) {
            const query = await `
            INSERT INTO cards(list_id, card_name, created_by, card_position) 
                VALUES (${listId}, "${cardName}", ${createdBy}, ${cardPosition})
            `

            conn.query(query, async (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(description)
                    console.log({card_id: data.insertId, card_name: cardName, list_id: listId})

                    const cardMembersQuery = `
                    INSERT INTO cards_members(card_id, member_id, card_head, card_follower)
                        VALUES(${data.insertId}, ${createdBy}, ${createdBy}, ${createdBy})
                    `

                    conn.query(cardMembersQuery, async (err, data) => {
                        if (err) {
                            console.log(err)
                        } else{
                            console.log('cards_members query ok')
                        }
                    })

                    await res.send({card_id: data.insertId, card_name: cardName, list_id: listId})
                }
            })
        }

        runCreateQuery(`Card ${cardName} added to db in list id ${listId}`)
    }

    static async getAllCards(req, res){
        const listId = req.query.list_id
        const query = `SELECT * FROM cards WHERE list_id = ${listId} ORDER BY card_position ASC`
 
        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Got all lists from list ${listId}`)
                
                const dbCheck = await data.map(e => {
                    return {card_id: e.card_id, card_name: e.card_name, card_position: e.card_position}
                })
                console.log(dbCheck)
                res.send(dbCheck)
            }
        })
    }

    static async editCardName(req, res){
        const cardId = req.body.params.card_id
        const cardName = req.body.params.card_name

        console.log(cardId, cardName)

        const query = `UPDATE cards SET card_name="${cardName}" WHERE card_id=${cardId};`
            
        runQuery(query, `Card ${cardName} updated into db`)
    }

    static async sortCards(req, res){
        const orderedCards = req.body.data.ordered_cards
        
        orderedCards.map(e =>{
            const query = `UPDATE cards SET card_position=${e.new_position} WHERE card_id=${e.card_id};`
            
            runQuery(query, `Card ${e.card_name} updated into db`)
 
        })

    }

    static async getCurrentPosition(req, res){
        const listId = req.query.list_id
        const query = `SELECT MAX(card_position) AS max_card_position FROM cards WHERE list_id=${listId}`
        
        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data[0].max_card_position.toString())
            }
        })
                
    }

}