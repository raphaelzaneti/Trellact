import React, { useEffect, useState } from 'react'
import '../../../css/style.css'
import axios from 'axios'

export default function CardButtonLabel(props) {

    const [activeMenu, setActiveMenu] = useState(false)
    const [activeLabels, setActiveLabels] = useState([])
    const [updateLabels, setUpdateLabels] = useState(false)
    const [editLabelCaption, setEditLabelCaption] = useState(null)
    const [labelCaptionText, setLabelCaptionText] = useState(null)

    const labelColors = ['red', 'blue', 'green', 'yellow', 'gray', 'purple', 'black', 'pink']

    function toggleLabelsMenu() {
        setActiveMenu(!activeMenu)
    }

    function getCardLabels() {
        axios.get('http://localhost:3001/card/get-labels', { params: { card_id: props.card_id } })
            .then(res => res.data)
            .then(data => {
                setActiveLabels(data)
            })
    }

    function changeCardLabel(e) {

        const labelColor = e.target.parentElement.id.split('-')[1]
        const isActive = e.target.parentElement.getAttribute('is_active') === 'true'
        const labelCaption = e.target.innerText
        const labelId = isActive ? e.target.parentElement.getAttribute('label_id') : null

        axios.post('http://localhost:3001/labels/set-labels', {
            params: {
                is_active: isActive, label_id: labelId, card_id: props.card_id,
                label_color: labelColor, label_caption: labelCaption, action: 'toggle'
            }
        }
        )
            .then(res => res.data)
            .then(data => setUpdateLabels(!updateLabels))
        
    }

    function toggleEditLabelCaption(e) {
        const labelColor = e.target.getAttribute('label_color')
        const labelCaption = e.target.getAttribute('label_caption')
        setEditLabelCaption(labelColor)
        setLabelCaptionText(labelCaption)
    }

    function handleCaptionKeyDown(e) {

        const labelColor = e.target.parentElement.id.split('-')[1]
        const isActive = e.target.parentElement.getAttribute('is_active') === 'true'
        const labelId = isActive ? e.target.parentElement.getAttribute('label_id') : null

        if (e.key === 'Enter') {
            console.log(labelCaptionText)
            setEditLabelCaption(null)
            console.log('Enter ok')
            axios.post('http://localhost:3001/labels/set-labels', {
                params: {
                    is_active: isActive, label_id: labelId, card_id: props.card_id,
                    label_color: labelColor, label_caption: labelCaptionText, action: 'editCaption'
                }
            }
            )
                .then(res => res.data)
                .then(data => setUpdateLabels(!updateLabels))
            
        }
    }

    useEffect(() => getCardLabels(), [updateLabels])

    return (
        <div className="card__button-dropdown-menu">
            <button
                onClick={toggleLabelsMenu}
                id={'card__button-label' + props.toKey}
                className="btn btn-secondary btn-sm card__button-area-btn"
            >
                Labels
            </button>

            <div id={"card__button-label-dropdown" + props.toKey} className={activeMenu ? "card__button-dropdown" : "card__button-dropdown-closed"}>
                <h4 className='card__button-dropdown--title'>Labels</h4>
                {<div className='card__button-dropdown--list-area'>
                    <h5 className='card__button-dropdown--subtitle'>Labels</h5>
                    {
                        labelColors.map(color => {
                            let labelId, labelCaption
                            let labelIsActive = false
                            activeLabels.map(label => {
                                if (label.label_color === color) {
                                    labelId = label.label_id
                                    labelCaption = label.label_caption
                                    labelIsActive = true
                                }
                            })

                            return (
                                <span className={`label-row`}>
                                    <span className={`label-color label-${color}`} id={'label-' + color} label_id={labelId} is_active={String(labelIsActive)}>
                                        {editLabelCaption === color
                                            ? <input className='label-caption-input' type="text" value={labelCaptionText} label_id={labelId}
                                                onChange={e => setLabelCaptionText(e.target.value)} onKeyDown={handleCaptionKeyDown}
                                            />
                                            : <span onClick={(e) => changeCardLabel(e)}>{labelCaption}</span>
                                        }
                                        {labelIsActive ? <span className='label-active'></span> : ''}
                                    </span>
                                    {
                                        editLabelCaption === color
                                            ? <span className='label-color-cancel-caption' onClick={() => setEditLabelCaption(null)}>X</span>
                                            : <span className='label-color-edit-caption' label_caption={labelCaption} label_color={color} onClick={(e) => toggleEditLabelCaption(e)}></span>
                                    }
                                </span>
                            )
                        })
                    }
                </div>}
            </div>

        </div>
    )
}