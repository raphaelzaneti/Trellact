import React, {useState, useContext} from 'react'
import { useEffect } from 'react'
import './CardName.css'
import {DeleteBtn, CardContent, InputCard} from '../index'
import {CardContext} from './StoreCard.jsx'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'

export default props =>{
    
    const name = 'name'+props.id
    const [newInput, setNewInput] = useState(undefined)
    const {activeInput, setActiveInput} = useActiveCardInput()
    const {cardName, setCardName} = useContext(CardContext)
    const [showCard, setShowCard] = useState(true)

    setCardName(props.text)

    function editName(){
        setActiveInput(true)
        const span = document.getElementById(name)
        const button = document.getElementById('btn-'+props.id)
        const delBtn = document.getElementById('btn-del-card-'+name)
        setNewInput(<InputCard id={props.id} text={props.text}/>)
        span.remove()
        button.remove()
        delBtn.remove()
    }
    
    function deleteCard(id){
        //setShowCard(false)
        const card = document.getElementById(id).parentElement

        card.remove()
    }
    

    return(
        <>
            {showCard
            ?   <>
                    <span id={name} class="card-span" data-bs-toggle="modal" data-bs-target={props.handleCardModal}>{props.text}</span>
                    <button type="button" class="btn btn-light" id={'btn-'+props.id} onClick={() => editName()}><i class="far fa-edit"></i></button>
                    <DeleteBtn type="card" id={'card-'+name} onClick={() => deleteCard(name)} name={props.text} />
                    {newInput}
                </>

            : ""    
            }
        </>
    )
}