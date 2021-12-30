import react, { useState } from "react";
import './CardDescription.css'

export default function CardDescription(props){

    const [isTextArea, setIsTextArea] = useState(false)
    const [descriptionText, setDescriptionText] = useState("Insert your description here")
    const [textAreaText, setTextAreaText] = useState(null)

    function editDescription(){
        setIsTextArea(true)
        setTextAreaText(descriptionText)
    }

    function setDescription(){
        const textArea = document.getElementById(props.id+"-description-text-area")
        if(!textArea.value || textArea.value === " "){
            setDescriptionText("Insert your description here")    
        } else{
            
            setDescriptionText(textArea.value)
        }

        cancelEdit()
    }
    
    function cancelEdit(){
        setIsTextArea(false)
    }

    return(
        <div id={props.id+"-description"} className="card__description">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
            </svg> <h2 className="card__description-title">Description</h2>
            { isTextArea 
                ?<>
                    <textarea className="card__description-text-area card__description-text" 
                        id={props.id+"-description-text-area"} 
                        className="card__description-text-area" 
                        onChange={e => setTextAreaText(e.target.value)} 
                        value={textAreaText}
                    />
                    <div className="card__description-btn-area">
                        <button className="btn btn-success btn-submit" onClick={setDescription}>Submit</button>
                        <button className="btn btn-danger" onClick={cancelEdit}>Cancel</button>
                    </div>
                </>:
                    <p 
                        className="
                            card__description-content 
                            card__description-initial 
                            card__description-text" 
                        onClick={editDescription}
                    >
                            {descriptionText}
                    </p>
            }
        </div>
    )
}