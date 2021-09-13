import React, {useState, useContext} from 'react'
import './ListsInput.css'
import { NewListBtn, Lists } from '../index'
import {AppContext} from './Store'


export default props =>{
    
    const [newList, setNewList] = useState(undefined)
    const {boolInput, updateInput} = useContext(AppContext)    

    function submitName(e){
        e.preventDefault()
        const input = document.getElementById(props.id)
        if(input.value === "" || undefined || null){alert('Insert a name to the list')
        } else{
            updateInput(!boolInput)
            const div = document.getElementsByClassName("active-input-list")
            setNewList(<Lists id={props.id} title={input.value}/>)
            div[0].remove()
        }
    }

    return(
        <>
            <div className="active-input-list">
                <form action="submit" onSubmit={submitName}>
                    <div class="input-group mb-3">
                            <input type="text" id={props.id} class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                </form>
            </div>
            {newList}
        </>
    )
}
