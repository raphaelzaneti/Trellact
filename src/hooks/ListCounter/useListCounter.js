import React, { useState, createContext, useContext } from 'react'

export const ListCounterContext = createContext()


export default function ListCounterProvider(props){
    
    const [listCounter, setListCounter] = useState(0)
    
    return(
        <ListCounterContext.Provider value={{
            listCounter, 
            setListCounter
         }}>
            {props.children}
        </ListCounterContext.Provider>
    )
}

export function useListCounter(){
    const context = useContext(ListCounterContext)

    const {listCounter, setListCounter} = context

    return {listCounter, setListCounter}
}