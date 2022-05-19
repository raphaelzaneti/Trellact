import React, { useState, createContext, useContext } from 'react'

export const CardNameContext = createContext()


export default function CardNameProvider(props){
    
    const [cardName, setCardName] = useState(null)
    const [cardId, setCardId] = useState(0)

    const [cardMembers, setCardMembers] = useState(null)
    const [cardLabels, setCardLabels] = useState([])
    
    return(
        <CardNameContext.Provider value={{
            cardName,
            setCardName,
            cardId, 
            setCardId, 
            cardMembers, 
            setCardMembers, 
            cardLabels, 
            setCardLabels
         }}>
            {props.children}
        </CardNameContext.Provider>
    )
}

export function useCardName(){
    const context = useContext(CardNameContext)

    const {cardName, setCardName, cardId, setCardId, cardMembers, setCardMembers, cardLabels, setCardLabels} = context

    return {cardName, setCardName, cardId, setCardId, cardMembers, setCardMembers, cardLabels, setCardLabels}
}