import React, { useState, createContext, useContext } from 'react'

export const CardCounterContext = createContext()


export default function CardCounterProvider(props){
    
    const [cardCounter, setCardCounter] = useState(0)
    
    return(
        <CardCounterContext.Provider value={{
            cardCounter, 
            setCardCounter
         }}>
            {props.children}
        </CardCounterContext.Provider>
    )
}

export function useCardounter(){
    const context = useContext(CardCounterContext)

    const {cardCounter, setCardCounter} = context

    return {cardCounter, setCardCounter}
}