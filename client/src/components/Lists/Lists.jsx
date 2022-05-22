import axios from 'axios'
import React, { useState } from 'react'
import '../../css/style.css'
import { DeleteBtn, NewCardBtn } from '../index'

export default props => {
    const [listName, setListName] = useState(props.title)
    const [updateName, setUpdateName] = useState(true)
    const [showList, setShowList] = useState(true)


    const inputUpdate = <form type="submit" onSubmit={changeName}>
        <input type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)} />
    </form>

    function showName() {
        if (updateName) { return listName } else { return inputUpdate }
    }

    function changeName(e) {
        e.preventDefault()
        setUpdateName(!updateName)
    }

    function setBoolean() {
        if (updateName) { setUpdateName(!updateName) }
    }

    function deleteList() {
        const list = document.getElementById(props.id)
        list.remove()


    }

    return (
            <>
                {showList
                    ? <div class="board-list" id={props.id}>
                        <div class="list-background">
                            <div class="list-header" onClick={() => setBoolean()}>
                                <span>{showName()}</span>
                            </div>
                            <DeleteBtn type="list" id={props.id} onClick={deleteList} name={listName} />
                        </div>
                        <div class="list-cards">
                            <NewCardBtn listId={props.id} />
                        </div>
                    </div>
                    : "No lists to show"
                }
            </>
    )

}