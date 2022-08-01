import React, { useEffect, useState } from 'react'
import '../../../css/style.css'
import axios from 'axios'

export default function CardButtonLabel(props) {

    const [activeMenu, setActiveMenu] = useState(false)
    const [activeLabels, setActiveLabels] = useState([])
    
    const labelColors = ['red', 'blue', 'green', 'yellow', 'gray', 'purple', 'black', 'pink']

    useEffect(() => getCardLabels(), [])

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
                        labelColors.map(color =>{
                            let labelId, labelCaption
                            let labelIsActive = false
                            activeLabels.map(label =>{
                                if(label.label_color === color){
                                    labelId = label.label_id
                                    labelCaption = label.label_caption
                                    labelIsActive = true
                                }
                            })

                            return (<span id={'label-'+color} label_id={labelId} className={`label-color label-${color}`}>{labelCaption} {labelIsActive ? <span className='label-active'></span>: ''}</span>)
                        })
                    }
                </div>}
            </div>

        </div>
    )
}