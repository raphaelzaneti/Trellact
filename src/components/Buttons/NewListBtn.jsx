import React, {useEffect, useState, useContext} from 'react'
import '../../css/style.css'
import {Lists, ListsInput} from '../index.js'
import {AppContext} from '../Lists/Store'
import {useListCounter} from '../../hooks/ListCounter/useListCounter'

export default props =>{
    const [lists, setLists] = useState([])
    let listId = 'list-'+0

    const {input, updateInput} = useContext(AppContext)    
    const {listCounter, setListCounter} = useListCounter()

    function renderNewList(){
        setListCounter(listCounter+1)
        listId = 'list-'+listCounter
        setLists((a)=> [...a, <ListsInput id={listId} key={listId} />])
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