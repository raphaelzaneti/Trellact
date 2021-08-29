import React, {useEffect, useState, useContext} from 'react'
import './NewListBtn.css'
import Lists from '../Lists/Lists'
import ListsInput from '../Lists/ListsInput'
import { AppContext } from '../Lists/Store'


export default props =>{
    const [lists, setLists] = useState([])
    const [counter, setCounter] = useState(0)
    let listId = 'list-'+counter

    function renderNewList(){
        setCounter(counter+1)
        setLists((a)=> [...a, <ListsInput id={listId} />])
        updateInput(!input)
    }

    const {input, updateInput} = useContext(AppContext)    
    
    function showButton(){
        return <button 
                className="btn new-list-btn" 
                onClick={renderNewList}
            > + Add new list</button>
    }

    return(
        <>
            {lists}
            {input ? showButton(): ''}
        </>
    )
}