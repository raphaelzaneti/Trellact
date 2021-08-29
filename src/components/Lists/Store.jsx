import React, { useState } from 'react'

const booleanState = true

export const AppContext = React.createContext(booleanState)

const Store = props =>{
    
    const [inputState, setInputState] = useState(true)

    function updateState(value){
        setInputState(value)
    }

    return(
        <AppContext.Provider value={{
            input: inputState,
            updateInput: value => updateState(value),
         }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default Store