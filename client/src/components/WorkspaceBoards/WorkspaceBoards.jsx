import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { useBoards } from "../../hooks/useBoards/useBoards";
import WorkspaceBoardCard from "./WorkspaceBoardCard";


export default props => {

    const [allBoards, setAllBoards] = useState([])
    const { boards, setBoards, boardId, setBoardId } = useBoards()

    const gridIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16">
        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
    </svg>

    const memberIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
    </svg>

    const settingIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide" viewBox="0 0 16 16">
        <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
    </svg>

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
        <section className="workspace__content">
            <div className="workspace__content-starred-boards">
                <h2 className="workspace__content-starred-boards-title"><i class="far fa-star"></i> Starred boards</h2>
                <div className="workspace__content-starred-boards-area">
                    <WorkspaceBoardCard boardName="board1" isStarred boardWorkspace="User Workspace" />
                    <WorkspaceBoardCard boardName="board2" isStarred boardWorkspace="User Workspace" />
                </div>
            </div>

            <div className="workspace__content-workspaces">
                <h2 className="workspace__content-workspaces-title">YOUR WORKSPACES</h2>
                <div className="workspace__content-workspaces-workspace">
                    <div className="workspace__content-workspaces-workspace_details">
                        <h3 className="workspace__content-workspaces-workspace_details-title">User's Workspace</h3>
                        <p className="workspace__content-workspaces-workspace_details-item"><i class="fab fa-trello"></i> Boards</p>
                        <p className="workspace__content-workspaces-workspace_details-item">{gridIcon} Views</p>
                        <p className="workspace__content-workspaces-workspace_details-item">{memberIcon} Members</p>
                        <p className="workspace__content-workspaces-workspace_details-item">{settingIcon} Settings</p>
                    </div>
                    <div className="workspace__content-workspaces-area">
                        {allBoards.length > 0
                            ? allBoards.map(e => <WorkspaceBoardCard boardName={e.board_name} boardLink={`/board/${e.board_id}`} />)
                            : "nothing"
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}