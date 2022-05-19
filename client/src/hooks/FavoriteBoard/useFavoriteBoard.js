import React, { useState, createContext, useContext } from 'react'

export const FavoriteBoardContext = createContext()


export default function FavoriteBoardProvider(props){
    
    const [isFavorite, setIsFavorite] = useState(false)
    
    return(
        <FavoriteBoardContext.Provider value={{
            isFavorite, 
            setIsFavorite
         }}>
            {props.children}
        </FavoriteBoardContext.Provider>
    )
}

export function useFavoriteBoard(){
    const context = useContext(FavoriteBoardContext)

    const {isFavorite, setIsFavorite} = context

    return {isFavorite, setIsFavorite}
}