require('dotenv').config()
const { conn, runQuery } = require('../db/db')


module.exports = class CardController {

    static async createCard(req, res) {
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
                    console.log({ card_id: data.insertId, card_name: cardName, list_id: listId })

                    const cardMembersQuery = `
                    INSERT INTO cards_members(card_id, member_id, card_head, card_follower)
                        VALUES(${data.insertId}, ${createdBy}, ${createdBy}, ${createdBy})
                    `

                    conn.query(cardMembersQuery, async (err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('cards_members query ok')
                        }
                    })

                    await res.send({ card_id: data.insertId, card_name: cardName, list_id: listId })
                }
            })
        }

        runCreateQuery(`Card ${cardName} added to db in list id ${listId}`)
    }

    static async getAllCards(req, res) {
        const listId = req.query.list_id
        const query = `SELECT * FROM cards WHERE list_id = ${listId} ORDER BY card_position ASC`

        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                
                const dbCheck = await data.map(e => {
                    return { card_id: e.card_id, card_name: e.card_name, card_position: e.card_position }
                })
                res.send(dbCheck)
            }
        })
    }

    static async editCardName(req, res) {
        const cardId = req.body.params.card_id
        const cardName = req.body.params.card_name

        const query = `UPDATE cards SET card_name="${cardName}" WHERE card_id=${cardId};`

        runQuery(query, `Card ${cardName} updated into db`)
    }

    static async sortCards(req, res) {
        const orderedCards = req.body.data.ordered_cards

        orderedCards.map(e => {
            const query = `UPDATE cards SET card_position=${e.new_position} WHERE card_id=${e.card_id};`

            runQuery(query, `Card ${e.card_name} updated into db`)

        })

    }

    static async getCurrentPosition(req, res) {
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

    static async getPositionById(req, res) {
        const cardId = req.query.card_id
        const query = `SELECT card_position FROM cards WHERE card_id=${cardId}`
        console.log(req.query)
        await conn.query(query, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data[0])
            }
        })

    }

    static async setPosition(req, res) {
        const cardId = req.body.params.card_id
        const currentList = req.body.params.current_list_id
        const newList = Number(req.body.params.new_list_id)
        const currentPosition = req.body.params.current_position
        const newPosition = Number(req.body.params.new_position)

        let allCards
        let allPastListCards

        const getCardsPositionQuery = `SELECT card_id, card_position FROM cards WHERE list_id=${newList} ORDER BY card_position`
        const getPastListPositionQuery = `SELECT card_id, card_position FROM cards WHERE list_id=${currentList} ORDER BY card_position`

        if (newList === currentList && newPosition === currentPosition) {
            return
        }

        await conn.query(getCardsPositionQuery, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                allCards = await data

                let successQuery
                try {
                    changeCardPosition()
                    successQuery = true
                } catch (error) {
                    successQuery = false
                } finally {
                    res.send({ success: successQuery })
                }
            }
        })

        async function changeCardPosition() {
            let queryChangeCardPosition


            if (currentList !== newList) {
                const lastCard = allCards.length > 0 ? allCards[allCards.length - 1] : 0
                const queryChangeList = `UPDATE cards SET list_id=${newList} WHERE card_id=${cardId}`
                runPositionQuery(queryChangeList)

                if (newPosition === lastCard.card_position + 1) {
                    queryChangeCardPosition = `UPDATE cards SET card_position=${newPosition} WHERE card_id=${cardId}`
                } else {
                    await allCards.map(card => {
                        if (card.card_position >= newPosition) {
                            card.card_position++
                            return card
                        }
                    })

                    await allCards.push({ card_id: cardId, card_position: newPosition })
                    queryChangeCardPosition = `UPDATE cards 
                        SET card_position = 
                            CASE card_id
                                ${allCards.map((card) => ' WHEN ' + card.card_id + ' THEN ' + card.card_position)}
                            END
                        WHERE list_id=${newList} AND card_id IN(${allCards.map((card) => ' ' + card.card_id)})
                    `
                    queryChangeCardPosition = queryChangeCardPosition.replace(/, WHEN/gi, ' WHEN')
                }

                await conn.query(getPastListPositionQuery, async (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        allPastListCards = await data
                        sortPastList()
                    }
                })

            } else if (newList === currentList) {

                if (newPosition < currentPosition) {
                    allCards.map(card => {
                        if (card.card_position >= newPosition && card.card_position < currentPosition) {
                            card.card_position++
                        }
                        return card
                    })
                } else {
                    allCards.map(card => {
                        if (card.card_position <= newPosition && card.card_position > currentPosition) {
                            card.card_position = card.card_position - 1
                        }
                        return card
                    })
                }
                allCards.map(card => {
                    if (card.card_id === cardId) {
                        card.card_position = newPosition
                    }
                    return card
                })

                queryChangeCardPosition = `UPDATE cards 
                        SET card_position = 
                            CASE card_id
                                ${allCards.map((card) => ' WHEN ' + card.card_id + ' THEN ' + card.card_position)}
                            END
                        WHERE list_id=${newList} AND card_id IN(${allCards.map((card) => ' ' + card.card_id)})
                    `
                queryChangeCardPosition = queryChangeCardPosition.replace(/, WHEN/gi, ' WHEN')
            }

            runPositionQuery(queryChangeCardPosition)

        }

        async function runPositionQuery(positionQuery) {
            await conn.query(positionQuery, async (err, data) => {

                if (err) {
                    console.log(err)
                } else {
                    console.log(data.message)
                }
            })
        }

        async function sortPastList() {
            const lastCardPastList = allPastListCards.length > 0 ? allPastListCards[allPastListCards.length - 1] : 0

            if (lastCardPastList.card_position > currentPosition) {
                await allPastListCards.map(card => {
                    if (card.card_position >= currentPosition) {
                        card.card_position = card.card_position - 1
                        return card
                    }
                })

                let querySortPastList = `UPDATE cards
                    SET card_position = 
                        CASE card_id
                            ${allPastListCards.map((card) => ' WHEN ' + card.card_id + ' THEN ' + card.card_position)}
                        END
                    WHERE list_id=${currentList} AND card_id IN(${allPastListCards.map((card) => ' ' + card.card_id)})
                `
                querySortPastList = querySortPastList.replace(/, WHEN/gi, ' WHEN')
                runPositionQuery(querySortPastList)
            }
        }

    }

    static async removeCard(req, res) {
        const cardId = req.body.params.card_id

        const membersQuery = `DELETE FROM cards_members WHERE card_id=${cardId};`
        const query = `DELETE FROM cards WHERE card_id=${cardId};`


        runQuery(membersQuery, `Card ${cardId} removed from card-members`)
        runQuery(query, `Card ${cardId} removed from db`)

    }

    static async setCardMember(req, res) {
        const cardId = req.body.params.card_id
        const userId = req.body.params.user_id
        const isMember = req.body.params.is_member

        let query, action

        if (isMember) {
            query = `DELETE FROM cards_members WHERE card_id=${cardId} AND member_id=${userId}`
            action = 'removed from'
        } else {
            query = `INSERT INTO cards_members(card_id, member_id, card_head, card_follower) VALUES(${cardId}, ${userId}, 0, 1)`
            action = 'added into'
        }

        await conn.query(query, async (err, data) => {

            if (err) {
                console.log(err)
                res.send({ success: false })
            } else {
                res.send({ success: true })
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