import { end } from '@popperjs/core'
import React, { useEffect, useState } from 'react'
import '../../../css/style.css'
//import { useCardName } from '../../../hooks/CardName/CardName'

export default function CardButtonLabel(props) {

    const [labelCheck, setLabelCheck] = useState([])
  /*  const { cardName, setCardName,
        cardId, setCardId, cardMembers,
        setCardMembers, cardLabels, setCardLabels } = useCardName()
*/
    function toggleLabelDropdown() {
        const dropdown = document.getElementById('card__button-label-dropdown' + props.toKey)
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none'
        } else {
            dropdown.style.display = 'block'
        }
    }

    function toggleLabel(color) {

  /*      if (cardLabels.includes(color)) {
            setCardLabels(cardLabels.filter(e => e !== color))
        } else {
            setCardLabels([...cardLabels, color])
        }*/
    }

/*    useEffect(() => {
        toggleLabelCheck()
    }, [cardLabels])*/

    function toggleLabelCheck() {
        let referenceArray = Array(8).fill(false)
        cardLabels.map(color => {
            switch (color) {
                case 'red':
                    referenceArray[0] = true
                    break;
                case 'blue':
                    referenceArray[1] = true
                    break;
                case 'green':
                    referenceArray[2] = true
                    break;
                case 'yellow':
                    referenceArray[3] = true
                    break;
                case 'gray':
                    referenceArray[4] = true
                    break;
                case 'purple':
                    referenceArray[5] = true
                    break;
                case 'black':
                    referenceArray[6] = true
                    break;
                case 'pink':
                    referenceArray[7] = true
                    break;
            }
        })

        setLabelCheck(referenceArray)
    //    console.log(labelCheck)
    }

    const renderLabelCheck = (<span className='label-color-check'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
        </svg>
    </span>)


    return (
        <div className="dropdown">
            <button
                onClick={toggleLabelDropdown}
                id={'card__button-label' + props.toKey}
                className="btn btn-secondary btn-sm card__button-area-btn"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Labels
            </button>

            <div id={"card__button-label-dropdown" + props.toKey} className="dropdown-menu card__button-label-dropdown" aria-labelledby={'card__button-label' + props.toKey}>
                <h4 className='card__button-label-dropdown--title'>Labels</h4>
                <div className='card__button-label-dropdown--list-area'>
                    <h5 className='card__button-label-dropdown--subtitle'>Labels</h5>
                    <span id="label-red" onClick={() => toggleLabel('red')} className='label-color label-red'>{labelCheck[0] ? renderLabelCheck : ''}</span>
                    <span id="label-blue" onClick={() => toggleLabel('blue')} className='label-color label-blue'>{labelCheck[1] ? renderLabelCheck : ''}</span>
                    <span id="label-green" onClick={() => toggleLabel('green')} className='label-color label-green'>{labelCheck[2] ? renderLabelCheck : ''}</span>
                    <span id="label-yellow" onClick={() => toggleLabel('yellow')} className='label-color label-yellow'>{labelCheck[3] ? renderLabelCheck : ''}</span>
                    <span id="label-gray" onClick={() => toggleLabel('gray')} className='label-color label-gray'>{labelCheck[4] ? renderLabelCheck : ''}</span>
                    <span id="label-purple" onClick={() => toggleLabel('purple')} className='label-color label-purple'>{labelCheck[5] ? renderLabelCheck : ''}</span>
                    <span id="label-black" onClick={() => toggleLabel('black')} className='label-color label-black'>{labelCheck[6] ? renderLabelCheck : ''}</span>
                    <span id="label-pink" onClick={() => toggleLabel('pink')} className='label-color label-pink'>{labelCheck[7] ? renderLabelCheck : ''}</span>
                </div>
            </div>

        </div>
    )
}