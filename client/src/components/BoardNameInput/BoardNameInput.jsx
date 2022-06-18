import React from "react";
import axios from 'axios'


export default props => {

    function handleSubmit(e){
        e.preventDefault()
        const input = document.getElementById('board-title-input')
        props.callback(false)
        changeNameInDb(input.value)
    }
    
    function changeNameInDb(name){
        props.setBoardName(name)
        const idNumber = getBoardId()
        
        console.log(name, idNumber)

        axios.post("http://localhost:3001/boards/edit/"+idNumber, {data: 
            {id: idNumber, new_name: name}
        }).then(res => console.log(res))
    }

    function getBoardId(){
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length-1]

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" id="board-title-input" />
        </form>
    )
}