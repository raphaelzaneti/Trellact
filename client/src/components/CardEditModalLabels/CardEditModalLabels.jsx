/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react"
import axios from "axios";

export default props => {
    const [activeLabels, setActiveLabels] = useState(null)
    const [updateLabels, setUpdateLabels] = useState(false)

    const labelColors = ['red', 'blue', 'green', 'yellow', 'gray', 'purple', 'black', 'pink']

    function toggleLabelsEdit() {
        props.activeButton === 'labels' ? props.setActiveButton(null) : props.setActiveButton('labels')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getCardLabels() {
        axios.get('http://localhost:3001/card/get-labels', { params: { card_id: props.cardId } })
            .then(res => res.data)
            .then(data => {
                setActiveLabels(data)
            })
    }

    function changeCardLabel(e){
        
        const labelColor = e.target.id.split('-')[2]
        const isActive = e.target.innerHTML !== ' ' ? true : false 
        const labelCaption = e.target.innerText
        const labelId = isActive ? e.target.getAttribute('label_id') : null
        
        axios.post('http://localhost:3001/labels/set-labels', {params: {is_active: isActive, label_id: labelId, 
            card_id: props.cardId, label_color: labelColor, label_caption: labelCaption, action: 'toggle'}}
        )
            .then(res => res.data)
            .then(data => setUpdateLabels(!updateLabels))
    }

    useEffect(() => getCardLabels(), [getCardLabels, updateLabels])

    return (
        <>
            <button className="card__edit-modal_settings-btn" onClick={toggleLabelsEdit}>Edit labels</button>
            <article className={`${props.activeButton === 'labels' ? 'd-block' : 'd-none'} card__edit-modal_edit-labels`}>
                <div className="card__edit-modal_edit-labels-header">
                    <h4>Labels</h4>
                    <button onClick={toggleLabelsEdit}>X</button>
                </div>
                <div className="card__edit-modal_edit-labels-content">
                    <div className="card__edit-modal_edit-labels-content-labels-area">
                        {
                            labelColors.map(color => {
                                let labelId, labelCaption
                                let labelIsActive = false

                                if (activeLabels !== null) {
                                    activeLabels.map(label => {
                                        if (label.label_color === color) {
                                            labelId = label.label_id
                                            labelCaption = label.label_caption
                                            labelIsActive = true
                                        }
                                        return null
                                    })
                                }

                                return (<span id={'modal-label-' + color} label_id={labelId} className={`card__edit-modal_edit-labels-content-label label-${color}`} onClick={(e) => changeCardLabel(e)} >{labelCaption} {labelIsActive ? <span className='label-active'></span> : ''}</span>)
                            })
                        }
                    </div>
                </div>
            </article>
        </>
    )
}