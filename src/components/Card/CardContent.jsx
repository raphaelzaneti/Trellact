import React, {useContext} from 'react'
import CardDescription from './CardDescription/CardDescription'
import '../../css/style.css'
import CardButtons from './CardButtons/CardButtons'
import CardActivity from './CardActivity/CardActivity'

export default props =>{
    
    return(
        <>
            <div className="card__content-container">
                <CardDescription id={props.id} />
                <CardButtons />
                <CardActivity />
            </div>

        </>
    )
}