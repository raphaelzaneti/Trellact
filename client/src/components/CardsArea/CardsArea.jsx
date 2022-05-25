import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NewCardBtn from "../Buttons/NewCardBtn";
import { useCards } from "../../hooks/useCards/useCards";
import CardBody from "../CardBody/CardBody";

export default props => {

    const {cards, setCards, cardId, setCardId} = useCards()
    
    async function getAllCards() {
        const listIdNumber = +props.listId.split('-')[1]

        await axios.get('http://localhost:3001/card/bylist', {params: {list_id: listIdNumber}})
            .then(res => {
                if(res.data.length>0){
                    res.data.map(e => setCards((a) => [...a, <CardBody listId={props.listId} key={'card-'+e.card_id} cardId={e.card_id} caption={e.card_name} activeInput={false} />]))
                }
            })               
    }
    
    //getAllCards()

    useEffect(getAllCards, [])

    return (

        <>
            {cards}
            <NewCardBtn listId={props.listId} />
        </>

    )
}