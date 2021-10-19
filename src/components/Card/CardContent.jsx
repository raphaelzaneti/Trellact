import React, {useContext} from 'react'
import { CardContext } from './StoreCard'

export default props =>{
    
    const {cardName, setCardName} = useContext(CardContext)

    function renderModal(){
        console.log('ok')
    }
    renderModal()
    
    return(
        <>
            <p>Description</p>
            <p>Buttons on the right side</p>
            <p>Comments</p>

        </>
    )
}