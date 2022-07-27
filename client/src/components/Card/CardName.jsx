import React from 'react'
import '../../css/style.css'
import CardEditModal from '../CardEditModal/CardEditModal'
import { DeleteBtn } from '../index'

export default props => {

    function deleteCard(id) {

        const card = document.getElementById(id).parentElement

        card.remove()
    }

    return (
        <div className='card__name'>
            <div className='card__half-1'>
                <span
                    class="card__span"
                    data-bs-toggle="modal"
                    data-bs-target={"#active-modal-"+props.cardId}
                >{props.name}</span>
                <div className='card__labels-area'>
                    {/*cardLabels === null ? " " : cardLabels.map(e => {
                        return <span className={'card__span-label label-' + e}></span>
                    })*/}
                </div>

                <span>
                    {/*cardMembers === null ? "" : cardMembers.map(e =>
                        e.active === true ? <img className='img-fluid card__span-member-photo' src={e.photo} /> : ""
                    )*/}
                </span>
            </div>
            <div className="card__half-2">
                <button 
                    type="button" 
                    class="card__btn-edit" 
                    id={'btn-' + props.id} 
                    data-bs-toggle="modal"
                    data-bs-target={"#edit-modal-"+props.cardId}
                />
            </div>

            <CardEditModal cardId={props.cardId} cardName={props.name} />
        </div>
    )

}