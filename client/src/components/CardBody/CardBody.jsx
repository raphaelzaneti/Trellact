import React, { useEffect, useMemo, useState } from "react";
import CardContent from "../Card/CardContent";
import CardHeader from "../Card/CardHeader";
import CardName from "../Card/CardName";
import InputCard from "../Card/InputCard";
import axios from "axios";

export default props => {

    const [activeInput, setActiveInput] = useState(props.activeInput)
    const [cardName, setCardName] = useState(props.caption)
    const [currentCardId, setCurrentCardId] = useState(props.cardId)
    const [boardMembers, setBoardMembers] = useState([])

    function updateCardData(obj) {
        setCardName(obj.card_name)
        setCurrentCardId(obj.card_id)
        setActiveInput(false)
    }

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
                        {<CardHeader card_name={cardName} card_id={currentCardId} />}
                        <div class="modal-body">
                            {<CardContent card_id={currentCardId} />}
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