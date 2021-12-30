import React, { useState, createContext, useContext } from 'react'

export const CardNameContext = createContext()


export default function CardNameProvider(props){
    
    const [cardName, setCardName] = useState(null)
    
    return(
        <CardNameContext.Provider value={{
            cardName,
            setCardName
         }}>
            {props.children}
        </CardNameContext.Provider>
    )
}

export function useCardName(){
    const context = useContext(CardNameContext)

    const {cardName, setCardName} = context

    return {cardName, setCardName}
}