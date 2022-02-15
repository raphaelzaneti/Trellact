import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import '../../css/style.css'
import { DeleteBtn, CardContent, InputCard } from '../index'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'
import { useCardName } from '../../hooks/CardName/CardName'

export default props => {

    const [newInput, setNewInput] = useState(undefined)
    const { activeInput, setActiveInput } = useActiveCardInput()
    const { cardName, setCardName,
        cardId, setCardId, cardMembers,
        setCardMembers, cardLabels, setCardLabels } = useCardName()
    const [showCard, setShowCard] = useState(true)


    const name = 'name' + props.id
    const renderizedName = cardName

    function editName() {
        setActiveInput(true)
        const span = document.getElementById(name)
        const button = document.getElementById('btn-' + props.id)
        const delBtn = document.getElementById('btn-del-card-' + name)
        setNewInput(<InputCard id={props.id} text={cardName} handleCardModal={props.handleCardModal} />)
        span.remove()
        button.remove()
        delBtn.remove()
    }

    function deleteCard(id) {

        const card = document.getElementById(id).parentElement

        card.remove()
    }


    return (
        <>
            {showCard
                ? <>
                    <span
                        id={name}
                        class="card__span"
                        data-bs-toggle="modal"
                        data-bs-target={props.handleCardModal}
                    >{renderizedName}</span>
                    {cardLabels === null ? " " : cardLabels.map(e => {
                        return <span className={'card__span-label label-' + e}></span>
                    })}
                    <span>
                        {cardMembers === null ? "" : cardMembers.map(e =>
                            e.active === true ? <img className='img-fluid card__span-member-photo' src={e.photo} /> : ""
                        )}
                    </span>
                    <button type="button" class="btn btn-light" id={'btn-' + props.id} onClick={() => editName()}><i class="far fa-edit"></i></button>
                    <DeleteBtn type="card" id={'card-' + name} onClick={() => deleteCard(name)} name={renderizedName} />
                    {newInput}
                </>

                : ""
            }
        </>
    )
}