import React, {useContext, useState} from 'react'
import '../../css/style.css'
import axios from 'axios'

export default props =>{
    
    const currentText = props.text || ""

    function handleInput(e){
        e.preventDefault()
        const formInput = document.getElementsByClassName('card__form-active')[0]
        const inputBox = document.getElementsByClassName('card__input-active')[0]
        if(inputBox.value==false){
            inputBox.placeholder='Insert card name'
        } else{
            //formInput.remove()
            //inputBox.remove()
            
            const cardName = inputBox.value
            const listIdNumber = +props.listId.split('-')[1]
            props.callback({card_name: cardName, card_id: 123})
            
            axios.post('http://localhost:3001/card/create', {params: {list_id: listIdNumber, card_name: cardName, created_by: 1}})
                .then(res => res.data)
                .then(data => props.callback({card_id: data.card_id, card_name: data.card_name}))
            
        }

    }

    return(
        <>
            <form className="card__form-active" action="submit" onSubmit={handleInput}>
                <input className="card__input-active" placeholder={currentText}/>
            </form>
        </>
    )
}