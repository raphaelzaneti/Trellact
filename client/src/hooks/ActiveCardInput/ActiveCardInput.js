import React, { useState, createContext, useContext } from 'react'


export const ActiveCardInputContext = createContext()

export default function ActiveCardInputProvider(props){
    const [activeInput, setActiveInput] = useState(false)

    return (
        <ActiveCardInputContext.Provider
            value = {{
                activeInput,
                setActiveInput
            }}
        >
            {props.children}
        </ActiveCardInputContext.Provider>
    )
}

export function useActiveCardInput(){
    const context = useContext(ActiveCardInputContext)

    const {activeInput, setActiveInput} = context

    return {activeInput, setActiveInput}

}