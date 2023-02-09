import React, { useState, createContext, useContext } from 'react'


export const BoardTagsContext = createContext()

export default function BoardTagsProvider(props){
    const [boardTags, setBoardTags] = useState(null)

    return (
        <BoardTagsContext.Provider
            value = {{
                boardTags, 
                setBoardTags
            }}
        >
            {props.children}
        </BoardTagsContext.Provider>
    )
}

export function useBoardTags(){
    const context = useContext(BoardTagsContext)

    const {boardTags, setBoardTags} = context

    return {boardTags, setBoardTags}

}