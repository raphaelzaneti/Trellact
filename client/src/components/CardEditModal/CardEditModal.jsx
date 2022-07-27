import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios'

export default props => {
    const [cardName, setCardName] = useState(props.cardName)
    const [currentCardId, setCurrentCardId] = useState(props.cardId)

    function changeCardName(e) {
        setCardName(e.target.value)
        console.log(cardName)
    }

    function updateCardName() {
        console.log(cardName)

        axios.post('http://localhost:3001/card/edit-name', { params: { card_id: currentCardId, card_name: cardName } })
            .then(res => res.data)
            .then(data => console.log(data))

    }

    return (
        <>
            <div
                class="modal fade"
                id={"edit-modal-" + currentCardId}
                tabindex="-1"
                aria-labelledby={"edit-modal-" + currentCardId}
                aria-hidden="true"
            >
                <div class="modal-dialog modal-md card__edit-modal_main-height">
                    <div class="modal-content card__edit-modal_flex">
                        <div class="modal-body card__edit-modal_content">
                            <label htmlFor="card__edit-name-input" className="card__edit-modal_label">Card name: </label>
                            <textarea
                                type="text"
                                name="card__edit-name-input"
                                id="card__edit-name-input"
                                text={cardName}
                                onChange={changeCardName}
                                className="card__edit-modal_input"
                            >{cardName}</textarea>
                            <button className="card__edit-modal_btn card__edit-modal_btn-save" onClick={updateCardName}>Save</button>
                        </div>
                        <div className="card__edit-modal_settings">
                            <button className="card__edit-modal_settings-btn">Edit labels</button>
                            <button className="card__edit-modal_settings-btn">Edit members</button>
                            <button className="card__edit-modal_settings-btn">Move</button>
                            <button className="card__edit-modal_settings-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}