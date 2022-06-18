import React, {useState, createContext, useContext} from "react";

const BoardsContext = createContext()

export default function BoardsProvider(props){
    
    const [boards, setBoards] = useState([])
    const [boardId, setBoardId] = useState(null)

    return(
        <BoardsContext.Provider value={{
            boards, 
            setBoards,
            boardId, 
            setBoardId
        }}>
            {props.children}
        </BoardsContext.Provider>
    )
}

export function useBoards(){
    const {boards, setBoards, boardId, setBoardId} = useContext(BoardsContext)
    return {boards, setBoards, boardId, setBoardId}
}   
