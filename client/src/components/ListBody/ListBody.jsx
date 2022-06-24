import axios from 'axios'
import React, { useState } from 'react'
import '../../css/style.css'
import CardsProvider from '../../hooks/useCards/useCards'
import { useLists } from '../../hooks/useLists/useLists'
import CardsArea from '../CardsArea/CardsArea'
import { DeleteBtn } from '../index'
import ListSettingBtn from '../ListSettingBtn/ListSettingBtn'

export default props => {
    const [listName, setListName] = useState(props.title)
    const [updateName, setUpdateName] = useState(true)
    const [showList, setShowList] = useState(true)

    const { lists, setLists, listId, setListId } = useLists()

    const inputUpdate = <form type="submit" onSubmit={changeName}>
        <input type="text"
            value={listName}
            onFocus={((e) => changeListValues(e))}
            onChange={(e) => setListName(e.target.value)} />
    </form>

    function showName() {
        if (updateName) { return listName } else { return inputUpdate }
    }

    function changeListValues(e) {
        document.addEventListener("keydown", e => {
            if (e.key === "Escape") { setUpdateName(!updateName) }
        });
    }

    function changeName(e) {
        e.preventDefault()
        setUpdateName(!updateName)
        changeNameInDb(listName)
    }

    function setBoolean() {
        if (updateName) { setUpdateName(!updateName) }
    }

    function deleteList() {
        const list = document.getElementById(props.id)
        setLists(lists.filter(e => e.key !== props.id))
        removeFromDb()
    }

    function changeNameInDb(name) {
        const idNumber = props.id.split('-')[1]

        axios.post("http://localhost:3001/lists/edit/" + idNumber, {
            data:
                { id: idNumber, new_name: name }
        }).then(res => console.log(res))
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
                    <CardsProvider>
                        <div class="list-background">
                            <div class="list-header" onClick={() => setBoolean()}>
                                <span>{showName()}</span>
                            </div>
                            <ListSettingBtn listId={props.id} deleteCallback={deleteList} name={listName} />
                        </div>
                        <div class="list-cards">
                            <CardsArea listId={props.id} />
                        </div>
                    </CardsProvider>
                </div>
                : "No lists to show"
            }
        </>
    )

}