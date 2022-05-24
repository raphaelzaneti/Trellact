import React, {useState, createContext, useContext} from "react";

const CardsContext = createContext()

export default function CardsProvider(props){
    
    const [cards, setCards] = useState([])
    const [cardId, setCardId] = useState(null)

    return(
        <CardsContext.Provider value={{
            cards, 
            setCards,
            cardId, 
            setCardId
        }}>
            {props.children}
        </CardsContext.Provider>
    )
}

export function useCards(){
    const {cards, setCards, cardId, setCardId} = useContext(CardsContext)
    return {cards, setCards, cardId, setCardId}
}   
