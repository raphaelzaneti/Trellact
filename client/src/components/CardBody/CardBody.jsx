import React, { useEffect, useMemo, useState } from "react";
import InputCard from "../Card/InputCard";

export default props => {

    const [activeInput, setActiveInput] = useState(props.activeInput)
    const [cardName, setCardName] = useState(props.caption)
    const [currentCardId, setCurrentCardId] = useState(props.cardId)

    function updateCardData(obj){
        setCardName(obj.card_name)
        setCurrentCardId(obj.card_id)
        setActiveInput(false)
    }

    console.log(activeInput)

    return (
        <>
            <article id={currentCardId}>
                {activeInput 
                    ?
                        <>
                            <InputCard listId={props.listId} callback={updateCardData} />                            
                        </>
                    :
                        <div>{cardName}</div>
                }
            </article>
        </>
    )
}