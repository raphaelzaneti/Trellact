import React, {useContext, useState} from 'react'
import './Card.css'
import {CardName} from '../index'
import {CardContext} from './StoreCard.jsx'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'

export default props =>{
    
    const [newSpan, setNewSpan] = useState(undefined)
    const currentText = props.text || ""
    const {activeInput, setActiveInput} = useActiveCardInput()

    function handleInput(e){
        e.preventDefault()
        const inputBox = document.getElementById('input'+props.id)
        if(inputBox.value==false){
            inputBox.placeholder='Insert card name'
        } else{
            inputBox.remove()
            setActiveInput(false)
            setNewSpan(<CardName id={props.id} text={inputBox.value} handleCardModal={props.handleCardModal}/>)
        }
    }

    return(
        <>
            <form action="submit" onSubmit={handleInput}>
                <input id={'input'+props.id} placeholder={currentText}/>
            </form>
            {newSpan}
        </>
    )
}