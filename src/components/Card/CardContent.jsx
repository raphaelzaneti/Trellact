import React, {useContext} from 'react'
import CardDescription from './CardDescription/CardDescription'
import '../../css/style.css'
import CardButtons from './CardButtons/CardButtons'
import CardActivity from './CardActivity/CardActivity'
import CardMembers from './CardMembers/CardMembers'

export default props =>{
    
    return(
        <>
            <div className="card__content-container">
                <div className='card__content-details'>
                    <CardMembers />
                </div>
                <CardDescription id={props.id} />
                <CardButtons toKey={props.id} />
                <CardActivity />
            </div>

        </>
    )
}