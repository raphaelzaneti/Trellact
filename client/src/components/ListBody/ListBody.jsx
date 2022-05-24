import axios from 'axios'
import React, { useState } from 'react'
import '../../css/style.css'
import CardsProvider from '../../hooks/useCards/useCards'
import { useLists } from '../../hooks/useLists/useLists'
import CardsArea from '../CardsArea/CardsArea'
import { DeleteBtn, NewCardBtn } from '../index'

export default props => {
    const [listName, setListName] = useState(props.title)
    const [updateName, setUpdateName] = useState(true)
    const [showList, setShowList] = useState(true)

    const { lists, setLists, listId, setListId } = useLists()

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
        setLists(lists.filter(e => e.key !== props.id))
        removeFromDb()
    }

    function removeFromDb() {
        const idNumber = props.id.split('-')[1]
        axios.get('http://localhost:3001/lists/remove', { params: { name: listName, board: 1, id: idNumber } })
            .then(res => console.log(res))
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
                        <CardsProvider>
                            <CardsArea listId={props.id} />
                        </CardsProvider>
                    </div>
                </div>
                : "No lists to show"
            }
        </>
    )

}