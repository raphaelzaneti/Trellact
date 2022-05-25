import react, { useContext, useState } from "react";
//import { useCardName } from "../../hooks/CardName/CardName";

export default function CardHeader(props){

  //  const {cardName, setCardName} = useCardName()
    const [isInputCard, setIsInputCard] = useState(false)

    function toggleInput(){
        console.log(isInputCard)
        console.log(cardName)
        setIsInputCard(!isInputCard)
    }

    function updateName(e){
        e.preventDefault()
        const input = document.getElementById("active-input-modal-card")
        const newName = input.value
        setCardName(newName)
        console.log(input.value)
        toggleInput()
        
    }

    return(
        <div class="modal-header">
            {isInputCard ?
                <form>
                    <input id="active-input-modal-card" placeholder={cardName}/>
                    <button onClick={e=>updateName(e)}>Submit</button>
                </form> 
            :
                <div>
                    <h5 class="modal-title card-title" id="exampleModalLabel" onClick={() => toggleInput()} >{cardName}</h5>
                </div>
            }
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    )
}