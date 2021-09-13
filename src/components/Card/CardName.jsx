import React, {useState, useContext} from 'react'
import { useEffect } from 'react'
import './CardName.css'
import {DeleteBtn, CardContent, InputCard} from '../index'
import {CardContext} from './StoreCard.jsx'

export default props =>{
    
    const name = 'name'+props.id
    const [newInput, setNewInput] = useState(undefined)
    const {isInput, setInput} = useContext(CardContext)
    const [showCard, setShowCard] = useState(true)


    function editName(){
        setInput(false)
        const span = document.getElementById(name)
        const button = document.getElementById('btn-'+props.id)
        setNewInput(<InputCard id={props.id} text={props.text}/>)
        span.remove()
        button.remove()
    }

    function deleteCard(){
        setShowCard(false)
    }
    
    return(
        <>
            {showCard
            ?   <>
                    <span id={name} class="card-span" data-bs-toggle="modal" data-bs-target={props.handleCardModal}>{props.text}</span>
                    <button type="button" class="btn btn-light" id={'btn-'+props.id} onClick={editName}><i class="far fa-edit"></i></button>
                    <DeleteBtn type="card" id={name} onClick={deleteCard} name={props.text} />
                    {newInput}
                </>

            : ""    
            }
        </>
    )
}