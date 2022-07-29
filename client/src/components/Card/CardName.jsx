import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../css/style.css'
import CardEditModal from '../CardEditModal/CardEditModal'
import { DeleteBtn } from '../index'

export default props => {

    const [cardMembers, setCardMembers] = useState([])
    const [cardLabels, setCardLabels] = useState([])

    function deleteCard(id) {

        const card = document.getElementById(id).parentElement

        card.remove()
    }

    function getCardMembers(){
        axios.get('http://localhost:3001/user/from-card/all', {params: {card_id: props.cardId}})
            .then(res => res.data)
            .then(data => setCardMembers(data))
    }

    function getCardLabels(){
        axios.get('http://localhost:3001/card/get-labels', {params: {card_id: props.cardId}})
            .then(res => res.data)
            .then(data => {
                setCardLabels(data)
            })
    }

    useEffect(() =>{
        getCardMembers()
        getCardLabels()
    }, [])

    return (
        <div className='card__name'>
            <div className='card__half-1' onClick={getCardLabels}>
                <span
                    class="card__span"
                    data-bs-toggle="modal"
                    data-bs-target={"#active-modal-"+props.cardId}
                >{props.name}</span>
                <div className='card__labels-area'>
                    {
                    cardLabels.length !== 0 ?cardLabels.map(e => {
                        return <span className={'card__span-label card__label-'+e.label_color}></span>
                    }) : " "}
                </div>
                <span className='card__members-area'>
                    {cardMembers.length !== 0 ? cardMembers.map(e => (<span className='card__members-member'>{e.first_name[0]}{e.last_name[0]}</span>)) : ""}
                    
                </span>
            </div>
            <div className="card__half-2">
                <button 
                    type="button" 
                    class="card__btn-edit" 
                    id={'btn-' + props.id} 
                    data-bs-toggle="modal"
                    data-bs-target={"#edit-modal-"+props.cardId}
                />
            </div>

            <CardEditModal cardId={props.cardId} cardName={props.name} />
        </div>
    )

}