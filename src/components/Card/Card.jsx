import React, {useState, useContext, useEffect} from 'react'
import './Card.css'
import {CardContent, CardName, InputCard} from '../index.js'
import {CardContext} from './StoreCard.jsx'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'

export default props =>{

    const {cardName, setCardName} = useContext(CardContext)

    const {activeInput, setActiveInput} = useActiveCardInput()

    useEffect(
        function activateModal(){
            const modal = document.getElementById(props.id+"active-modal") || document.getElementById(props.id+"inactive-modal")
            if(activeInput){
                modal.id = props.id+"inactive-modal"
            } else {
                modal.id = props.id+"active-modal"
            }
        }, [activeInput]
    )

    useEffect(()=>console.log(activeInput), [activeInput])

    return(
        <>
            <div id={props.id}>
                <InputCard id={props.id} handleCardModal={"#"+props.id+"active-modal"}/>
            </div>

            
            <div class="modal fade" id={props.id+"active-modal"} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title card-title" id="exampleModalLabel">{cardName}</h5>
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