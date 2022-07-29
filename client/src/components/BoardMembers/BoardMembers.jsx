import React, { useEffect, useState } from "react";
import axios from 'axios'

export default props => {

    const [boardMembers, setBoardMembers] = useState([])

    function getBoardMembers() {
        const idNumber = getBoardId()

        axios.get("http://localhost:3001/user/from-board/all", {
            params:
                { board_id: idNumber}
        }).then(res => res.data)
        .then(data => setBoardMembers(data))
    }

    function getBoardId() {
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length - 1]

    }

    useEffect(() => getBoardMembers(), [])

    return (
        <span type="button" id="board__details-workspace" className="board__details-members-area">
            {boardMembers.map(e => (<span className="board__details-member">{e.first_name[0]}{e.last_name[0]}</span>))}
        </span>
    )
}