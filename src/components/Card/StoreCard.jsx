import React, { useState } from 'react'

const booleanState = false

export const CardContext = React.createContext(booleanState)


const StoreCard = props =>{
    
    const [isInput, setInput] = useState(false)
    const [cardName, setCardName] = useState(null)
    
    return(
        <CardContext.Provider value={{
            isInput: isInput,
            setInput: value => setInput(value),
            cardName: cardName,
            setCardName: value => setCardName(value)
         }}>
            {props.children}
        </CardContext.Provider>
    )
}

export default StoreCard