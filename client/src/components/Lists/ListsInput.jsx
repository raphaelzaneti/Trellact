import React, {useState, useContext} from 'react'
import axios from 'axios'
import '../../css/style.css'
import { NewListBtn, Lists } from '../index'
import { useListPosition } from '../../hooks/useListPosition/useListPosition'
import { useLists } from '../../hooks/useLists/useLists'


export default props =>{
    
    const { lists, setLists, listId, setListId } = useLists()
    const {listPosition, setListPosition} = useListPosition()

    function submitName(e){
        e.preventDefault()
        const input = document.getElementById(props.id)
        if(input.value === "" || undefined || null){alert('Insert a name to the list')
        } else{
            const div = document.getElementsByClassName("active-input-list")
            props.setLists((a) => [...a, <Lists id={props.id} title={input.value} position={listPosition} key={props.id}/>])
            props.callback(false)
            saveListDb(input.value)
            setListPosition(listPosition+1)
        }
    }
    
    function saveListDb(name){
        axios.get('http://localhost:3001/lists/create', {params: {listName: name, board: 1, listPosition: listPosition}})
            .then(res => {
                console.log(res.data)
                setListId(listId+1)
            })
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
        </>
    )
}
