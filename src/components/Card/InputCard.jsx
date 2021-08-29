import React, {useContext, useState} from 'react'
import './Card.css'
import CardName from './CardName'
import {CardContext} from './StoreCard'

export default props =>{
    
    const [newSpan, setNewSpan] = useState(undefined)
    const currentText = props.text || ""
    const {isInput, setInput} = useContext(CardContext)

    function handleInput(e){
        e.preventDefault()
        const inputBox = document.getElementById('input'+props.id)
        if(inputBox.value==false){
            inputBox.placeholder='Insert card name'
        } else{
            inputBox.remove()
            setInput(true)
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