import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import { useBoards } from "../../hooks/useBoards/useBoards";
import WorkspaceNavbar from "../../components/WorkspaceNavBar/WorkspaceNavbar";
import WorkspaceBoards from "../../components/WorkspaceBoards/WorkspaceBoards";

export default function Workspace(props) {

    const [allBoards, setAllBoards] = useState([])
    const { boards, setBoards, boardId, setBoardId } = useBoards()

    async function getAllBoards() {
        let generatedBoards = []

        await axios.get('http://localhost:3001/boards/all', { params: { user_id: 1 } })
            .then(res => {
                res.data.map(e => generatedBoards.push(e))
            })

        await setAllBoards(generatedBoards)
        await setBoards(generatedBoards)
    }

    useEffect(getAllBoards, [])

    return (
        <main className="workspace__container">
            <WorkspaceNavbar />
            <WorkspaceBoards />
        </main>
    )
}