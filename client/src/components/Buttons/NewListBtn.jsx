import React, {useContext} from 'react'
import '../../css/style.css'
import {AppContext} from '../Lists/Store'

export default props =>{

    const {input, updateInput} = useContext(AppContext)

    function renderNewList(){
        props.callback(true)
    }
    
    function showButton(){
        return <button 
                className="btn new-list-btn" 
                onClick={renderNewList}
            > + Add new list</button>
    }

    return(
        <>
            {input ? showButton(): ''}
        </>
    )
}