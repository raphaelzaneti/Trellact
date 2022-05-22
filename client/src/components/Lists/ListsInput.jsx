import React, {useState, useContext} from 'react'
import axios from 'axios'
import '../../css/style.css'
import { NewListBtn, Lists } from '../index'
import {AppContext} from './Store'
import { useListPosition } from '../../hooks/useListPosition/useListPosition'


export default props =>{
    
    const [newList, setNewList] = useState(undefined)
    const {boolInput, updateInput} = useContext(AppContext)    

    //post backend integration
    const {listPosition, setListPosition} = useListPosition()

    function renderCurrentLists(){
        props.currentLists.map(e =>{
            setNewList(<Lists id={'list-'+e.list_id} title={e.list_name}/>)
        })
    }

    function submitName(e){
        e.preventDefault()
        const input = document.getElementById(props.id)
        if(input.value === "" || undefined || null){alert('Insert a name to the list')
        } else{
            updateInput(!boolInput)
            const div = document.getElementsByClassName("active-input-list")
            setNewList(<Lists id={props.id} title={input.value}/>)
            div[0].remove()
            saveListDb(input.value)
            console.log(listPosition)
            setListPosition(listPosition+1)
        }
    }

    
    function saveListDb(name){
        axios.get('http://localhost:3001/lists/create', {params: {listName: name, board: 1, listPosition: listPosition}})
            .then(res => console.log(res.data))
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
