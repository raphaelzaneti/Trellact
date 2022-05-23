import React, {useState, createContext, useContext} from "react";

const ListsContext = createContext()

export default function ListsProvider(props){
    
    const [lists, setLists] = useState([])
    const [listId, setListId] = useState(null)

    return(
        <ListsContext.Provider value={{
            lists, 
            setLists,
            listId, 
            setListId
        }}>
            {props.children}
        </ListsContext.Provider>
    )
}

export function useLists(){
    const {lists, setLists, listId, setListId} = useContext(ListsContext)
    return {lists, setLists, listId, setListId}
}   
