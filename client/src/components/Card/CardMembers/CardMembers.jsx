import React, {useContext} from 'react'
import '../../../css/style.css'
//import { useCardName } from '../../../hooks/CardName/CardName'

export default props =>{
    
    //const {cardName, setCardName, cardId, setCardId, cardMembers, setCardMembers} = useCardName()

    return(
        <div className='card__content-members-area'>
            {/*cardMembers===null ? " " : cardMembers.map(e =>{
                if(e.active===true){
                    return <img className='img-fluid card__content-members-photo' src={e.photo} alt="" />
                } else{return ""}
            })*/}
        </div>
    )
}