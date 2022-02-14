import React, {useState, useContext, useEffect} from 'react'
import '../../css/style.css'
import {CardContent, CardName, InputCard} from '../index.js'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'
import CardHeader from './CardHeader'
import CardNameProvider from '../../hooks/CardName/CardName'

export default props =>{

    const {activeInput, setActiveInput} = useActiveCardInput()

    useEffect(
        function activateModal(){
            const modal = document.getElementById("m-"+props.id+"-active-modal") || document.getElementById("m-"+props.id+"-inactive-modal")
            if(activeInput){
                modal.id = "m-"+props.id+"-inactive-modal"
            } else {
                modal.id = "m-"+props.id+"-active-modal"
            }
        }, [activeInput]
    )

    return(
        <>
        <CardNameProvider>

            <div id={props.id}> 
                <InputCard id={props.id} handleCardModal={"#"+"m-"+props.id+"-active-modal"}/>
            </div>

            
            <div 
                class="modal fade" 
                id={"m-"+props.id+"-active-modal"} 
                tabindex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true"
            >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content card__container">
                        <CardHeader />
                        <div class="modal-body">
                            <CardContent id={"card-content-"+props.id} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </CardNameProvider>
        </>
    )
}