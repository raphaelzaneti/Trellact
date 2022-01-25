import React, {useEffect, useState, useContext} from 'react'
import '../../css/style.css'
import {Lists, ListsInput} from '../index.js'
import {AppContext} from '../Lists/Store'


export default props =>{
    const [lists, setLists] = useState([])
    const [counter, setCounter] = useState(0)
    let listId = 'list-'+counter

    const {input, updateInput} = useContext(AppContext)    

    function renderNewList(){
        setCounter(counter+1)
        setLists((a)=> [...a, <ListsInput id={listId} />])
        updateInput(!input)
    }

    
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