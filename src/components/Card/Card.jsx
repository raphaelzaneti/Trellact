import React, {useState, useContext, useEffect} from 'react'
import './Card.css'
import {CardContent, CardName, InputCard} from '../index.js'
import {CardContext} from './StoreCard.jsx'

export default props =>{

    const {isInput, setInput} = useContext(CardContext)
    console.log(isInput)
    useEffect(
        function activateModal(){
            const modal = document.getElementById(props.id+"active-modal") || document.getElementById(props.id+"inactive-modal")
            if(!isInput){
                modal.id = props.id+"inactive-modal"
            } else {
                modal.id = props.id+"active-modal"
            }
            console.log(isInput)
        }, [isInput]
    )

    useEffect(()=>console.log(isInput), [isInput])

    return(
        <>
            <div id={props.id}>
                <InputCard id={props.id} handleCardModal={"#"+props.id+"active-modal"}/>
            </div>

            
            <div class="modal fade" id={props.id+"active-modal"} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">#Card Name</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <CardContent />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}