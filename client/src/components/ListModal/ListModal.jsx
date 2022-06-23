import React, { useState } from "react";

export default props => {

    const [modalBody, setModalBody] = useState(null)
    const [onClickMethod, setOnClickMethod] = useState(null)

    const id = props.type + '-modal-' + props.id
    const totalLists = !props.listsPosition ? null : props.listsPosition[0].value
    const currentListPosition = !props.listsPosition ? 1 : props.listsPosition[1].value

    const newCardModal =
        <div>
            <label htmlFor="card-name">Card Name: </label>
            <input type="text" name="card-name" id={'input-' + id} className="list__settings-modal-input" />
        </div>

    const listPositionModal =
        <div>
            <label htmlFor="list-position">Select the new position</label>
            <select 
                name="list-position" 
                id={'select-' + id} 
                className="list__settings-modal-select"
            >
                {getPositionSelect()}
            </select>
        </div>

    function defineModalBody() {
        const pairs = {
            "new-card": [newCardModal, createNewCard],
            "move-list": [listPositionModal, moveList]
        }

        setModalBody(pairs[props.type][0])
        setOnClickMethod(() => pairs[props.type][1])

    }

    function createNewCard() {
        const input = document.getElementById('input-' + id)
        const inputValue = input === null ? "" : input.value
        props.callback(inputValue)
    }

    function getPositionSelect(){
        let optionArray = []

        if(totalLists!==null){
            for(let i = 1; i<= totalLists; i++){
                if(i===props.listsPosition[1].value){
                    optionArray.push(<option value={i} selected="selected" key={"opt-"+i}>{i+' (current)'}</option>)
                } else{
                    optionArray.push(<option value={i} key={"opt-"+i}>{i}</option>)
                }
            }
        }

        return optionArray
    }

    function moveList() {
        const select = document.getElementById('select-' + id)
        const selectValue = select === null ? "" : select.value
        console.log(selectValue)
        props.callback(currentListPosition, selectValue)
    }


    return (
        <>
            <span aria-label="Close" className='delete-btn' data-bs-toggle="modal" data-bs-target={"#" + id} onClick={defineModalBody} >{props.caption}</span>

            <div class="modal fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{props.modalTitle}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {modalBody}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={onClickMethod}>{props.confirmAction}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}