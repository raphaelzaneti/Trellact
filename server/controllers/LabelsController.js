require('dotenv').config()
const { conn, runQuery } = require('../db/db')

module.exports = class LabelsController {

    static async setCardLabels(req, res){
        const {is_active, label_id, card_id, label_color, label_caption} = req.body.params
        let query

        if(is_active){
            query = `DELETE FROM cards_labels WHERE label_id=${label_id}`
        } else{
            query = `INSERT INTO cards_labels(card_id, label_caption, label_color) VALUES(${card_id}, "${label_caption}", "${label_color}")`
        }

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })

    }

    static async getCardLabels(req, res) {
        const cardId = req.query.card_id

        const query = `SELECT * FROM cards_labels WHERE card_id=${cardId}`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })

    }
}