import React, {useState, createContext, useContext} from "react";

const ListPositionContext = createContext()

export default function ListPositionProvider(props){
    
    const [listPosition, setListPosition] = useState(1)

    return(
        <ListPositionContext.Provider value={{
            listPosition, 
            setListPosition
        }}>
            {props.children}
        </ListPositionContext.Provider>
    )
}

export function useListPosition(){
    const {listPosition, setListPosition} = useContext(ListPositionContext)
    return {listPosition, setListPosition}
}