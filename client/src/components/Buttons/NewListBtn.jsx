import React, {useContext} from 'react'
import '../../css/style.css'

export default props =>{

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
            {showButton()}
        </>
    )
}