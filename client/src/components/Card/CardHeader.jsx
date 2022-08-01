import axios from "axios";
import react, { useContext, useState } from "react";
import { useUpdate } from "../../hooks/useUpdate/useUpdate";

export default function CardHeader(props){

    const [cardName, setCardName] = useState(props.card_name)
    const [isInputCard, setIsInputCard] = useState(false)
    const {update, setUpdate} = useUpdate()

    function toggleInput(){
        setIsInputCard(!isInputCard)
    }

    function updateName(e){
        e.preventDefault()
        const input = document.getElementById("active-input-modal-card")
        const newName = input.value
        if(newName !== cardName && newName !== null){
            axios.post('http://localhost:3001/card/edit-name', {params: {card_id: props.card_id, card_name: newName}})
            setCardName(newName)
            toggleInput()
        } else{
            input.value = cardName
            toggleInput()
        }
    }

    return(
        <div class="modal-header">
            {isInputCard ?
                <form>
                    <input id="active-input-modal-card" placeholder={cardName} value={cardName}/>
                    <button onClick={e=>updateName(e)}>Submit</button>
                </form> 
            :
                <div>
                    <h5 class="modal-title card-title" id="exampleModalLabel" onClick={() => toggleInput()} >{cardName}</h5>
                </div>
            }
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setUpdate(!update)}></button>
        </div>
    )
}