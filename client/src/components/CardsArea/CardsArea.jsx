import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NewCardBtn from "../Buttons/NewCardBtn";
import { useCards } from "../../hooks/useCards/useCards";
import CardBody from "../CardBody/CardBody";
import { useUpdate } from "../../hooks/useUpdate/useUpdate";

export default props => {

    const {cards, setCards, cardId, setCardId} = useCards()
    const {update, setUpdate} = useUpdate()
    
    async function getAllCards() {
        setCards([])
        const listIdNumber = +props.listId.split('-')[1]

        await axios.get('http://localhost:3001/card/bylist', {params: {list_id: listIdNumber}})
            .then(res => {
                if(res.data.length>0){
                    res.data.map(e => setCards((a) => [...a, <CardBody listId={props.listId} key={'card-'+e.card_id} cardId={e.card_id} caption={e.card_name} activeInput={false} />]))
                }
            })               
    }
    
    useEffect(getAllCards, [update])

    return (

        <>
            {cards}
            <NewCardBtn listId={props.listId} />
        </>

    )
}