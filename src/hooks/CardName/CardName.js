import React, { useState, createContext, useContext } from 'react'

export const CardNameContext = createContext()


export default function CardNameProvider(props){
    
    const [cardName, setCardName] = useState(null)
    const [cardId, setCardId] = useState(0)

    const [cardMembers, setCardMembers] = useState(null)
    
    return(
        <CardNameContext.Provider value={{
            cardName,
            setCardName,
            cardId, 
            setCardId, 
            cardMembers, 
            setCardMembers
         }}>
            {props.children}
        </CardNameContext.Provider>
    )
}

export function useCardName(){
    const context = useContext(CardNameContext)

    const {cardName, setCardName, cardId, setCardId, cardMembers, setCardMembers} = context

    return {cardName, setCardName, cardId, setCardId, cardMembers, setCardMembers}
}