import React, { useState } from 'react'

const booleanState = false

export const CardContext = React.createContext(booleanState)


const StoreCard = props =>{
    
    const [isInput, setInput] = useState(false)
    
    return(
        <CardContext.Provider value={{
            isInput: isInput,
            setInput: value => setInput(value),
         }}>
            {props.children}
        </CardContext.Provider>
    )
}

export default StoreCard