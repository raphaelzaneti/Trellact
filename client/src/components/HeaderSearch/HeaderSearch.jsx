import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/style.css'
import { useBoards } from '../../hooks/useBoards/useBoards'

export default props => {

    const [searchInputValue, setSearchInputValue] = useState('')
    const [suggestionsActive, setSuggestionsActive] = useState(false)
    const [suggestedBoards, setSuggestedBoards] = useState([])
    const { boards, setBoards, boardId, setBoardId } = useBoards()

    function handleInputSearchChange(el) {
        setSearchInputValue(el.target.value)
        findBoards(el.target.value.toLowerCase())
    }

    function findBoards(word) {

        let boardsFound = []

        boards.map(e => {
            if (e.board_name.toLowerCase().includes(word)) {
                boardsFound.push(e)
                console.log(e.board_name)

            }
        })

        setSuggestedBoards(boardsFound)
    }

    if(suggestionsActive){
        window.addEventListener('click', function(e){   
            if (!document.getElementById('search').contains(e.target)){
                setSuggestionsActive(false)
            }
          })
    }

    return (
        <div id="search" className="header__search-area">
            <input type="text" className="header__search-input"
                placeholder='Type the board name' value={searchInputValue} onFocus={() => setSuggestionsActive(true)}
                onChange={e => handleInputSearchChange(e)}
            />
            <button id="search-btn" className="btn header__search-btn" ><i class="fas fa-search"></i></button>
            <div className={`header__search-suggestions-area ${suggestionsActive ? '' : 'd-none'}`}>
                <h4 className='header__search-suggestions-title'>Boards found</h4>
                {suggestedBoards.length === 0
                    ? <p>None found</p>
                    : suggestedBoards.map(e => (
                        <Link to={`/board/${e.board_id}`} onClick={() => setSuggestionsActive(false)}>
                            <div className='header__search-suggestions-item' id={'board-' + e.board_id}>
                                <p>{e.board_name}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )

}