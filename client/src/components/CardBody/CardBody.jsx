import React, { useEffect, useMemo, useState } from "react";
import CardContent from "../Card/CardContent";
import CardHeader from "../Card/CardHeader";
import CardName from "../Card/CardName";
import InputCard from "../Card/InputCard";

export default props => {

    const [activeInput, setActiveInput] = useState(props.activeInput)
    const [cardName, setCardName] = useState(props.caption)
    const [currentCardId, setCurrentCardId] = useState(props.cardId)

    function updateCardData(obj) {
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
                    <InputCard listId={props.listId} callback={updateCardData} />
                    :
                    <CardName name={cardName} cardId={currentCardId} />
                }
            </article>

            <div
                class="modal fade"
                id={"active-modal-"+currentCardId}
                tabindex="-1"
                aria-labelledby={"active-modal-"+currentCardId}
                aria-hidden="true"
            >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content card__container">
                        {/*<CardHeader />*/} <p>{cardName}</p>
                        <div class="modal-body">
                            {/*<CardContent id={"card-content-" + props.id} />*/} <p>content</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}